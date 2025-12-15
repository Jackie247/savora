import { create } from "zustand";
import type {
	NewRow,
	TableRowData,
	TableType,
} from "../../../types/table.types";
import { supabase } from '@/lib/supabase/client'
import useAuthStore from "./auth.store";

interface TableStore {
	tables: Record<TableType, Partial<TableRowData>[]>;
	currentTableTotal: number;
	expensesTotal: number;
	addRow: (row: NewRow) => void;
	deleteRow: (rowId: number) => Promise<void>;
	getRows: () => Promise<void>;
	updateRow: (row) => Promise<void>;
	calculateTableTotal: (table: TableType) => void;
	calculateAllExpenses: () => void;
}

const useTableStore = create<TableStore>()((set, get) => ({
	tables: {
		fixedPayments: [],
		investments: [],
		credit: [],
	},
	currentTableTotal: 0,
	expensesTotal: 0,

	addRow: async (row) => {
		const { session } = useAuthStore.getState();

		if (!session) {
			console.error('No session found');
			return;
		}

		try {
			const { error } = await supabase
				.from('expenses')
				.insert({
					...row,
					user_id: session.user.id // add user_id so we can keep track of expenses for each user
				})

			if (error) throw error;

			// console.log("Expense added:", data);

			// Refresh the table data
			await get().getRows();
		} catch (error) {
			console.error("Error adding expense:", error);
			throw error;
		}
	},
	deleteRow: async (rowId) => {
		try {
			const { error } = await supabase
				.from('expenses')
				.delete(
			)
				.eq('id', rowId);

			if (error) throw error;

			// console.log("Row deleted:", data);

			// Refresh the table data
			await get().getRows();
		} catch (error) {
			console.log("Error:", error);
		}
	},
	getRows: async () => {
		const { session, loading } = useAuthStore.getState();
		console.log(loading)
		console.log("session is", session)
		if (loading || !session) return;

		try {
			console.log("Querying db for rows")
			const { data: rows, error } = await supabase
				.from("expenses")
				.select("*")
				.eq("user_id", session.user.id)
				.order("name", { ascending: true });

			if (error) throw error;

			const updatedTable: Record<TableType, Partial<TableRowData>[]> = {
				fixedPayments: [],
				investments: [],
				credit: [],
			};

			rows?.forEach((row: TableRowData) => {
				switch (row.expense_type?.toLowerCase()) {
					case "fixedpayments":
						updatedTable.fixedPayments.push(row);
						break;
					case "investments":
						updatedTable.investments.push(row);
						break;
					case "credit":
						updatedTable.credit.push(row);
						break;
				}
			});
			console.log("Tables fetched from db, calculating all expenses")
			set({ tables: updatedTable });
			get().calculateAllExpenses();

		} catch (err) {
			console.error("Error getting expenses:", err);
		}
	},
	updateRow: async (row) => {
		// you can update all values but seems like theres a better way to only update values that have changed
		const {
			name,
			value,
			expense_type,
			is_recurring,
			expense_date,
			recurring_day,
			recurring_interval,
			recurring_day_of_week
		} = row
		try {
			// sort by next date
			const { error } = await supabase
				.from('expenses')
				.update({ name, value, expense_type, is_recurring, expense_date, recurring_day, recurring_interval, recurring_day_of_week })
				.eq('id', row.id)

			if (error) throw error;
		} catch (error) {
			console.log("Error while updating row", error)
		}
	},
	calculateTableTotal: (table) => {
		const rows = get().tables[table];
		let total = 0;
		if (rows) {
			rows.forEach((row) => {
				total += row.value || 0;
			});
		}
		set((state) => ({ ...state, currentTableTotal: total.toFixed(2) }));
	},
	calculateAllExpenses: () => {
		const typesOfTables = Object.values(get().tables);
		const total = typesOfTables.flat().reduce((acc, expense) => acc + (expense.value || 0), 0);
		set((state) => ({ ...state, expensesTotal: total }));
	},
}));

export default useTableStore;

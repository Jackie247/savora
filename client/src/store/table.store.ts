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
		const { session } = useAuthStore.getState();
		if (!session) {
			console.log('No session found, skipping getRows');
			return;
		}

		try {
			// Query Supabase directly - RLS will automatically filter by user
			const { data: rows, error } = await supabase
				.from('expenses')
				.select('*')
				.eq('user_id', session.user.id)
				.order('created_at', { ascending: false });

			if (error) throw error;

			const updatedTable: Record<TableType, Partial<TableRowData>[]> = {
				fixedPayments: [],
				investments: [],
				credit: [],
			};

			if (rows) {
				rows.forEach((row: TableRowData) => {
					const type = row.expense_type?.toLowerCase();

					switch (type) {
						case "fixedpayments":
							updatedTable.fixedPayments.push(row);
							break;
						case "investments":
							updatedTable.investments.push(row);
							break;
						case "credit":
							updatedTable.credit.push(row);
							break;
						default:
							console.log("Unknown expense type:", type);
					}
				});
			}

			set((state) => ({
				...state,
				tables: updatedTable,
			}));

			// Auto-calculate totals after loading
			get().calculateAllExpenses();
		} catch (error) {
			console.error("Error getting expenses:", error);
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
		set((state) => ({ ...state, currentTableTotal: total }));
	},
	calculateAllExpenses: () => {
		const typesOfTables = Object.values(get().tables);
		const total = typesOfTables.flat().reduce((acc, expense) => acc + (expense.value || 0), 0);
		set((state) => ({ ...state, expensesTotal: total }));
	},
}));

export default useTableStore;

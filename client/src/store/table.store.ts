import { create } from "zustand";
import type { TableRowData, TableType } from "../../../types/table.types";

interface TableStore {
	tables: Record<TableType, Partial<TableRowData>[]>;
	addRow: (expenseType: TableType) => void;
	deleteRow: (expenseType: TableType, rowId: string) => void;
	getRows: () => void;
}

const useTableStore = create<TableStore>()((set, get) => ({
	tables: {
		// empty initially
		fixedPayments: [],
		investments: [],
		credit: [],
	},
	addRow: async (table) => {
		const row = { name: "", value: "", day: "", expenseType: table };
		const endpoint = "/api/expenses/deleteExpense";
		try {
			const response = await fetch("/api/expenses/addExpense", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(row),
			});
			if (!response) {
				throw new Error(`POST request to ${endpoint} failed`);
			}
			const result = await response.json();

			console.log("Success", result);
		} catch (error) {
			console.log("Error:", error);
		}
	},
	deleteRow: async (expenseType, rowId) => {
		const endpoint = "/api/expenses/deleteExpense";

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ expenseType, rowId }),
			});

			if (!response) {
				throw new Error(`POST request to ${endpoint} failed`);
			}
			const result = await response.json();

			console.log("Success", result);
		} catch (error) {
			console.log("Error:", error);
		}
	},
	getRows: async () => {
		try {
			const response = await fetch("/api/expenses/");
			const rows = await response.json();

			const updatedTable: Record<TableType, Partial<TableRowData>[]> = {
				fixedPayments: [],
				investments: [],
				credit: [],
			};

			if (rows) {
				rows.forEach((row: TableRowData) => {
					switch (row.expenseType) {
						case "fixedPayments":
							updatedTable.fixedPayments.push(row);
							break;
						case "investments":
							updatedTable.investments.push(row);
							break;
						case "credit":
							updatedTable.credit.push(row);
							break;
						default:
							console.log("All rows done");
					}
				});
			}
			console.log("Updated table is: ", JSON.stringify(updatedTable, null, 2));
			set((state) => ({
				...state,
				tables: updatedTable,
			}));
		} catch (error) {
			console.log(error);
		}
	},
}));

export default useTableStore;

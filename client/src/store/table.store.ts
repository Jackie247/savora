import { create } from "zustand";
import type { TableRowData, TableType, NewRow } from "../../../types/table.types";

interface TableStore {
	tables: Record<TableType, Partial<TableRowData>[]>;
	addRow: (row: NewRow) => void;
	deleteRow: (rowId: number) => Promise<void>;
	getRows: (userId:number) => Promise<void>;
}

const useTableStore = create<TableStore>()((set, get) => ({
	tables: {
		// empty initially
		fixedPayments: [],
		investments: [],
		credit: [],
	},
	addRow: async (row) => {
		const endpoint = "/api/expenses/addExpense";
		try {
			const response = await fetch(endpoint, {
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
	deleteRow: async (rowId) => {
		const endpoint = "/api/expenses/deleteExpense";

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rowId }),
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
	getRows: async (userId) => {
		try {
			// console.log(userId)
			const response = await fetch(`/api/expenses/?userId=${userId}`);
			const rows = await response.json();

			const updatedTable: Record<TableType, Partial<TableRowData>[]> = {
				fixedPayments: [],
				investments: [],
				credit: [],
			};

			if (rows) {
				rows.forEach((row: TableRowData) => {
					const type = row.expenseType?.toLowerCase(); 
					// console.log(row.expenseType)
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
							console.log("All rows done");
					}
				});
			}
			// console.log("Updated table is: ", JSON.stringify(updatedTable, null, 2));
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

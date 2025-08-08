import { create } from "zustand";
import type {
	TableRowData,
	TableRowComponentProps,
	TableType,
} from "../../../types/table.types";

interface TableStore {
	tables: {
		fixedPayments: TableRowData[];
		investments: TableRowData[];
		credit: TableRowData[];
	};
	addRow: (table: TableType) => void;
	updateRow: (
		table: TableType,
		id: string,
		updates: Partial<TableRowData>,
	) => void;
	deleteRow: (table: TableType, id: string) => void;
}

const useTableStore = create<TableStore>()((set) => ({
	tables: {
		// these are set to initially empty here but should be pulled from the backend and db
		fixedPayments: [],
		investments: [],
		credit: [],
	},
	addRow: (table) => {
		// adds a empty row to the table which can be edited later.
		const emptyRow: TableRowData = {
			id: crypto.randomUUID(),
			name: "",
			value: 0,
			day: 1,
		};
		set((state) => ({
			tables: {
				...state.tables,
				[table]: [...state.tables[table], emptyRow],
			},
		}));
	},
	updateRow: (table, id, updates) => {
		set((state) => ({
				tables: {
					...state.tables,
					[table]: state.tables[table].map((row) => {
						// map applies function to each element in the array
						// if the row id does not match the id we are looking for, return the row unchanged
						// otherwise, return a new object with the updated properties
						if (row.id !== id) {
							return row;
						} else {
							return { ...row, ...updates };
						}
					}),
				},
		}));
	},
	deleteRow: (table, id) =>
		set((state) => {
			return {
				tables: {
					...state.tables,
					[table]: state.tables[table].filter((row) => row.id !== id), // filter returns a new array with all elements that pass the conditional
				},
			};
		}),
}));

export default useTableStore;

// types/table.ts
export type TableType = "fixedPayments" | "investments" | "credit";

export interface TableRowData {
	// stores the base schema for a table row
	id?: number;
	name?: string;
	value?: number;
	expense_type?: string; // keep track of which table the row is in
	expense_date?: string | null;
	is_recurring?: boolean;
	recurring_day?: number | null; // day of month for recurring expenses
	recurring_interval?: string; // 'monthly' etc.
	recurring_day_of_week?: string; // day of week for recurring expenses
}

export type NewRow = Omit<TableRowData, "id">;

// Props for TableRow component
export interface TableRowComponentProps {
	// extends the table row schema by adding functions that can manipulate the row
	row: TableRowData;
}

export interface TableComponentProps {
	tableName: TableType;
}

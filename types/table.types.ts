// types/table.ts
export type TableType = "fixedPayments" | "investments" | "credit";

export interface TableRowData {
	// stores the base schema for a table row
	expenseType?: string; // keep track of which table the row is in
	id: number;
	name?: string;
	value?: number;
	is_recurring?: boolean;
	expense_date?: Date;
	recurring_day?: number; // day of month for recurring expenses
	recurring_interval?: string; // 'monthly', 'yearly', etc.
	user_id: number;
}

export type NewRow = Omit<TableRowData, "id">;

// Props for TableRow component
export interface TableRowComponentProps {
	// extends the table row schema by adding functions that can manipulate the row
	row: TableRowData;
	onEdit: () => void;
	onDelete: () => void;
}

export interface TableComponentProps {
	tableName: TableType;
}

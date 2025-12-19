// types/table.ts
export interface ExpenseData {
	// stores the base schema for a table row
	id: number;
	name: string;
	value: number;
	expense_type: string; // keep track of which table the row is in
	expense_date: string | null;
	is_recurring: boolean;
	recurring_day: number | null; // day of month for recurring expenses
	recurring_interval: string | null; // 'monthly' etc.
	recurring_day_of_week: string | null; // day of week for recurring expenses
}

// For creating new rows (no id yet)
export type NewRow = Omit<ExpenseData, 'id'>;

// For updating rows (id required, other fields optional)
export type UpdateRow = Partial<ExpenseData> & { id: number };
export interface TableComponentProps {
	tableName: string;
}

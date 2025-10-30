export interface ModalFields{
    id?: number; // this is used to keep track of which row to edit in the current table
    name: string;
    value: number;
    expenseType: string;
    is_recurring: boolean;
    expense_date: string;
    recurring_day: string;
    recurring_interval: string
}
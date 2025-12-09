import pool from "../db/pool";

const addRow = async (
	name?: string,
	value?: number,
	expenseType?: string,
    is_recurring?: boolean,
    expense_date?: Date,
    recurring_day?: number, 
    recurring_interval?: string
) => {
    console.log('Raw value received:', value, typeof value);
	const result = await pool.query(
        `INSERT INTO expenses (name, value, expense_type, is_recurring, expense_date, recurring_day, recurring_interval) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, name, value, expense_type AS "expenseType", is_recurring, expense_date, recurring_day, recurring_interval`,
        [
            name, 
            value, 
            expenseType,
            is_recurring || false,
            expense_date || null,
            recurring_day ? recurring_day : null,
            recurring_interval || null
        ]
    );
	return result.rows[0];
};

const getRows = async () => {
	const result = await pool.query(
		`SELECT id, name, value, expense_type AS "expenseType", is_recurring, expense_date, recurring_day, recurring_interval  FROM expenses`,
	);
	return result.rows;
};

const editRow = async (
	id?: string,
	name?: string,
	value?: string,
	recurring_day?: string,
	expenseType?: string,
) => {
	const result = await pool.query(
		`UPDATE expenses 
        SET name = $2, value = $3, recurring_day = $4, expense_type = $5 
        WHERE id = $1
        RETURNING id, name, value, recurring_day, expense_type`,
		[id, name, value, recurring_day, expenseType],
	);
	return result.rows[0];
};

const deleteRow = async (id: string, tableName: string) => {
	const result = await pool.query(
		`DELETE FROM expenses WHERE id = $1 AND expense_type = $2`,
		[id, tableName],
	);
	return result.rows[0];
};

export default { addRow, getRows, editRow, deleteRow };

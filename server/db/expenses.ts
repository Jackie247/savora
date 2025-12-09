import pool from "./pool.js";

const addRow = async (
	name: string,
	value: number,
	is_recurring: boolean,
	user_id: number,
	expenseType?: string,
	expense_date?: Date,
	recurring_day?: number,
	recurring_interval?: string,
) => {
	console.log("Raw value received:", value, typeof value);
	const result = await pool.query(
		`INSERT INTO expenses (name, value, expense_type, is_recurring, expense_date, recurring_day, recurring_interval, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id, name, value, expense_type AS "expenseType", is_recurring, expense_date, recurring_day, recurring_interval, user_id`,
		[
			name,
			value,
			expenseType,
			is_recurring || false,
			expense_date || null,
			recurring_day ? recurring_day : null,
			recurring_interval || null,
			user_id,
		],
	);
	return result.rows[0];
};

const getRows = async (userId: number) => {
	const result = await pool.query(
		`SELECT id, name, value, expense_type AS "expenseType", is_recurring, TO_CHAR(expense_date, 'YYYY-MM-DD') as expense_date, recurring_day, recurring_interval FROM expenses
		WHERE user_id = $1`,
		[userId],
	);
	return result.rows;
};

const editRow = async (
	id?: string,
	name?: string,
	value?: string,
	expenseType?: string,
	is_recurring?: boolean,
	expense_date?: string,
	recurring_day?: string,
	recurring_interval?: string,
	recurring_day_of_week?: string,
) => {
	const result = await pool.query(
		`UPDATE expenses 
        SET name = $2, value = $3, expense_type = $4, is_recurring = $5, expense_date = $6::date, recurring_day = $7, recurring_interval = $8, recurring_day_of_week = $9
        WHERE id = $1
        RETURNING id, name, value, expense_type, is_recurring, expense_date::text as expense_date, recurring_day, recurring_interval, recurring_day_of_week`,
		[
			id,
			name,
			value,
			expenseType,
			is_recurring,
			expense_date,
			recurring_day,
			recurring_interval,
			recurring_day_of_week,
		],
	);
	return result.rows[0];
};

const deleteRow = async (id: string) => {
	const result = await pool.query(`DELETE FROM expenses WHERE id = $1`, [id]);
	return result.rows[0];
};

export default { addRow, getRows, editRow, deleteRow };

import pool from '../db/pool.ts'

const addRow = async (name?: string, value?: string, day?: string, expenseType?:string) => {
    const result = await pool.query(
            `INSERT INTO expenses (name, value, day, expense_type) VALUES ($1, $2, $3, $4) RETURNING id, name, value, day, expense_type`,
            [name, value, day, expenseType]
        )
    return result.rows[0];
}


export default {addRow}
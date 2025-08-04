import pool from '../db/pool.ts'

const addRow = async (name?: string, value?: string, day?: string) => {
    const result = await pool.query(
            `INSERT INTO financial_records (name, value, day) VALUES ($1, $2, $3) RETURNING id, name, value, day`,
            [name, value, day]
        )
    return result.rows[0];
}


export default {addRow}
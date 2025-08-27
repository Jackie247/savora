import pool from "./pool.js";

const addUser = async (username: string, email:string, password: string, ) => {
	const result =
		await pool.query(`INSERT INTO users (username, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING id, username, email`, [username, email, password]);
	return result.rows[0]
};

const findUser = async (email: string) => {
	const result = await pool.query(
		`SELECT * FROM users 
		WHERE email = $1
		RETURNING id, username, email, password
		`,
		[email],
	);
	return result.rows[0];
};

export default { findUser , addUser};

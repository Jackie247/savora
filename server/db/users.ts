import pool from "./pool.js";

const addUser = async (email: string, clerkId: string) => {
	const result = await pool.query(
		`INSERT INTO users (email, clerk_user_id) 
        VALUES ($1, $2)
		ON CONFLICT (email) DO NOTHING
		RETURNING id, email, clerk_user_id`,
		[email, clerkId],
	);
	return result.rows[0];
};

const findUser = async (email: string) => {
	const result = await pool.query(
		`SELECT id, email, clerk_user_id FROM users 
		WHERE email = $1
		`,
		[email],
	);
	return result.rows[0];
};

export default { findUser, addUser };

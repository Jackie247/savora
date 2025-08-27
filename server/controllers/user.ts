import queries from "../db/users";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/auth";

export const generateToken = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		// hash the password before send to db
		const hashedPw = await hashPassword(password);

		const newUser = await queries.addUser(username, email, hashedPw);
		console.log(`INSERTED user ${JSON.stringify(newUser, null, 2)}`);
		// // create jwt token
		const token = jwt.sign(
			{
				id: newUser.id,
				email: newUser.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.status(201).json({
			success: true,
			data: {
				id: newUser.id,
                username: newUser.username,
				email: newUser.email,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Something went wrong" });
	}
};

export const authenticateUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await queries.findUser(email);
		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}
		const correctPassword = await comparePassword(password, user.password);
		if (!correctPassword) {
			return res.status(401).json({ error: "Password is incorrect" });
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.status(201).json({
			success: true,
			data: {
				id: user.id,
                username: user.username,
				email: user.email,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Something went wrong" });
	}
};

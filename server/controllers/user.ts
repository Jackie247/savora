import queries from "../db/users";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response) => {
	try {
		const { email, clerkId } = req.body;
		const result = await queries.addUser(email, clerkId);
		res.status(200).json({
			message: "User created sucessfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Failed to add user",
		});
	}
};

export const findUser = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const result = await queries.findUser(email);
		if (result) {
			res.status(200).json(result);
		}else{
			throw Error("couldnt find user in db")
		}
	} catch (error) {
		res.status(500).json({
			error: "Couldn't find user in db ",
		});
		console.log(error);
	}
};

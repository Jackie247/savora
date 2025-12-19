import { Request, Response } from "express";
import queries from "../db/expenses";

export const getExpenses = async (req: Request, res: Response) => {
	// get data from db
	const userId = Number(req.query.userId); // extract from query
	if (!userId) return res.status(400).json({ error: "Missing userId" });

	try {
		const rows = await queries.getRows(userId);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch expenses" });
	}
};

export const addExpense = async (req: Request, res: Response) => {
	// add data to db
	try {
		const {
			name,
			value,
			expense_type,
			is_recurring,
			expense_date,
			recurring_day,
			recurring_interval,
			user_id,
		} = req.body;

		console.log(
			`Data sent to /api/expenses/addExpense is: ${JSON.stringify(req.body, null, 2)}`,
		);

		// Validate values
		if (value) {
			if (Number.isNaN(parseFloat(value))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}
		if (!expense_type) {
			return res.status(400).json({ error: "Missing expense type" });
		}

		const result = await queries.addRow(
			name,
			value,
			is_recurring,
			user_id,
			expense_type,
			expense_date,
			recurring_day,
			recurring_interval,
		);
		console.log("Successfully added row to DB");
		res.status(200).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const editExpense = async (req: Request, res: Response) => {
	try {
		const {
			id,
			name,
			value,
			expense_type,
			is_recurring,
			expense_date,
			recurring_day,
			recurring_interval,
			recurring_day_of_week
		} = req.body;
		console.log(
			`Data received to /api/expenses/editExpense is: ${JSON.stringify(req.body, null, 2)}`,
		);
		// Validate values
		if (value) {
			if (Number.isNaN(parseFloat(value))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}
		if (!expense_type) {
			return res.status(400).json({ error: "Missing expense type" });
		}

		const expenseDate = expense_date || null;

		const result = await queries.editRow(
			id,
			name,
			value,
			expense_type,
			is_recurring,
			expenseDate,
			recurring_day,
			recurring_interval,
			recurring_day_of_week
		);
		console.log(
			`Succesfully edited row with ID: ${id} with values ${JSON.stringify(result, null, 2)}.`,
		);
		res.status(200).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteExpense = async (req: Request, res: Response) => {
	try {
		const { rowId } = req.body;
		console.log(
			`Data sent to /api/expenses/deleteExpense is: ${JSON.stringify(req.body, null, 2)}`,
		);

		// Validate values
		if (rowId) {
			if (Number.isNaN(parseFloat(rowId))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}

		await queries.deleteRow(rowId);

		console.log(`Succesfully deleted row with ID: ${rowId}.`);

		res.status(200).json({ success: true, id: rowId });
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

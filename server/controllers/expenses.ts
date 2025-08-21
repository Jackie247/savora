import queries from "../db/queries";

export const getExpenses = async (req, res) => {
	// get data from db
	try {
		const rows = await queries.getRows();
		res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch expenses" });
	}
};

export const addExpense = async (req, res) => {
	// add data to db
	try {
		const { name, value, day, expenseType } = req.body;
		console.log(
			`Data sent to /finance is: ${JSON.stringify(req.body, null, 2)}`,
		);

		// Validate values
		if (value) {
			if (Number.isNaN(parseFloat(value))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}
		if (day) {
			const dayAsNumber = Number(day);
			if (
				!Number.isInteger(dayAsNumber) ||
				dayAsNumber < 1 ||
				dayAsNumber > 31
			) {
				return res
					.status(400)
					.json({ error: "Day needs to be a valid number between 1-31." });
			}
		}

		const result = await queries.addRow(name, value, day, expenseType);
		console.log(
			"Successfully added row to DB with values:",
			JSON.stringify({ name, value, day, expenseType }, null, 2),
		);
		res.status(200).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const editExpense = async (req, res) => {
	try {
		const { id, name, value, day, expenseType } = req.body;
		console.log(
			`Data sent to /finance is: ${JSON.stringify(req.body, null, 2)}`,
		);

		// Validate values
		if (value) {
			if (Number.isNaN(parseFloat(value))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}
		if (day) {
			const dayAsNumber = Number(day);
			if (
				!Number.isInteger(dayAsNumber) ||
				dayAsNumber < 1 ||
				dayAsNumber > 31
			) {
				return res
					.status(400)
					.json({ error: "Day needs to be a valid number between 1-31." });
			}
		}
		if (!expenseType) {
			return res.status(400).json({ error: "Missing expense type" });
		}

		const result = await queries.editRow(id, name, value, day, expenseType);
		console.log(
			`Succesfully edited row with ID: ${id} with values ${{name, value, day, expenseType}}.`,
		);
		res.status(200).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const { expenseType, rowId } = req.body;
		console.log(
			`Data sent to /api/expenses/deleteExpense is: ${JSON.stringify(req.body, null, 2)}`,
		);

		// Validate values
		if (rowId) {
			if (Number.isNaN(parseFloat(rowId))) {
				return res.status(400).json({ error: "Invalid numeric value" });
			}
		}
		if (!expenseType) {
			return res.status(400).json({ error: "Missing expense type" });
		}

		const result = await queries.deleteRow(rowId, expenseType);
		console.log(
			`Succesfully deleted row with ID: ${rowId}.`,
		);
		res.status(200).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

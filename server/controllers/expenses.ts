import queries from "../db/queries";
export const getExpenses = async (req, res) => {
    // get data from db
}

export const addExpense = async (req, res) => {
    // add data to db
    try {
		const { name, value, day, expenseType } = req.body;
        console.log(`Data sent to /finance is: ${JSON.stringify(req.body, null, 2)}`)

        // Validate values
        if(value){
            if (Number.isNaN(parseFloat(value))) {
                return res.status(400).json({ error: "Invalid numeric value" });
            }
        }
        if(day){
            const dayAsNumber = Number(day);
            if(!Number.isInteger(dayAsNumber) || dayAsNumber < 1 || dayAsNumber > 31){
                return res.status(400).json({error: "Day needs to be a valid number between 1-31."})
            }
        }

		const result = await queries.addRow(name, value, day, expenseType)
        console.log(
            "Successfully added row to DB with values:",
            JSON.stringify({ name, value, day, expenseType}, null, 2)
            );
        res.status(201).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

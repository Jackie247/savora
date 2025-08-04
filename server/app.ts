import dotenv from "dotenv";
import queries from './db/queries.js'
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("Home Page");
});

app.post("/finance", async (req, res) => {
	try {
		const { name, value, day } = req.body;
        console.log(`Data sent to /finance is: ${name} ${value} ${day}`)
		// Validate value is numeric
		if (Number.isNaN(parseFloat(value))) {
			return res.status(400).json({ error: "Invalid numeric value" });
		}
		const result = await queries.addRow(name, value, day)
        console.log(
            "Successfully added row to DB with values:",
            JSON.stringify({ name, value, day }, null, 2)
            );
        res.status(201).json(result);
	} catch (error: any) {
		console.error("Database error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

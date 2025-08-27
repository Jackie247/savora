import dotenv from "dotenv";
import express from "express";
import expensesRouter from "./routes/expenses.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("Home Page");
});
app.use("/api/expenses", expensesRouter);
// app.use('/api/expenses', expensesRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

import {
	clerkMiddleware,
	requireAuth,
} from "@clerk/express";
import dotenv from "dotenv";
import express from "express";
import expensesRouter from "./routes/expenses";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/user", requireAuth(), userRouter);
app.use("/api/expenses", requireAuth(), expensesRouter);
// app.use("/api/user", userRouter);
// app.use('/api/expenses', expensesRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

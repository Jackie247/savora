import { Router } from "express";
import * as expensesController from "../controllers/expenses";

const router = Router();

/**
 * GET methods
 * / - fetches the rows from expense table
 */
router.get("/", expensesController.getExpenses);
/**
 * POST methods
 * editExpense - takes a payload to update a row on expense table
 * deleteExpense - takes a payload of row id and expense_type to delete from expense table
 */
router.post("/addExpense", expensesController.addExpense);
router.post("/editExpense", expensesController.editExpense);
router.post("/deleteExpense", expensesController.deleteExpense);

export default router;

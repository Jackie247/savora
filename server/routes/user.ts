import { Router } from "express";
import * as userController from "../controllers/user";
const router = Router();

/**
 * GET methods
 * / - fetches the rows from expense table
 */

/**
 * POST methods
 * editExpense - takes a payload to update a row on expense table
 * deleteExpense - takes a payload of row id and expenseType to delete from expense table
 */
router.post("/addUser", userController.addUser);
router.post("/findUser", userController.findUser);

export default router;

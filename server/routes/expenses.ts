import { Router } from 'express'
import * as expensesController from '../controllers/expenses'

const router = Router();

router.get('/', expensesController.getExpenses);

router.post('/', expensesController.addExpense);
router.post('/editExpense', expensesController.editExpense)
router.post('/deleteExpense', expensesController.deleteExpense);

export default router

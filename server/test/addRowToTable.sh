curl -X POST http://localhost:8080/api/expenses/addExpense \
  -H "Content-Type: application/json" \
  -d '{"name": "TestName", "value": 123.45, "expenseType": "investments", "is_recurring": true, "recurring_day": 2, "recurring_interval": "monthly"}'
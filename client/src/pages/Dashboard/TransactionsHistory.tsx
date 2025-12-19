import { useTransactionsStore } from "../../store/transactions.store";
import TransactionRow from "./TransactionRow";

const TransactionsHistory = () => {
  const transactions = useTransactionsStore((state) => state.transactions);

  return (
    <section
      data-testid="transactions-history"
      className="p-6 flex flex-col bg-white md:grow md:p-4 md:mr-10 md:overflow-auto md:shadow md:rounded-md"
    >
      <div className="flex justify-between">
        <h2>Transactions History</h2>
        <span className="text-xs self-center text-gray-500">
          <a href="/expenses">See all</a>
        </span>
      </div>

      <article>
        <span>Jan 30, 2025</span>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            title={transaction.title}
            value={transaction.value}
            type={transaction.type}
            date={transaction.date}
            icon={transaction.icon}
          />
        ))}
      </article>
    </section>
  );
};

export default TransactionsHistory;

import formatNumberToCurrency from "@/lib/formatNumberToCurrency";

interface SummaryBoxProps {
  income: number;
  expenses: number;
}

const SummaryBox = ({ income, expenses }: SummaryBoxProps) => {
  const formattedIncome = formatNumberToCurrency(income);
  const formattedExpenses = formatNumberToCurrency(expenses);
  const formattedBalance = formatNumberToCurrency(income - expenses);

  return (
    <article
      data-testid="summary-box"
      className="flex flex-col bg-sidebar-primary border border-gray-100 shadow-sm rounded-lg w-[90vw] p-4 md:w-[70vw] md:h-60 justify-between md:p-8 xl:w-150"
    >
      <div className="flex flex-col mb-4">
        <span className="text-xl text-primary-foreground md:text-2xl">
          Balance
        </span>
        <span className="text-3xl text-primary-foreground md:text-4xl md:mt-2">
          <b data-testid="balance-value">{formattedBalance}</b>
        </span>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-primary-foreground md:text-3xl">Income</span>

          <span className="text-primary-foreground md:text-2xl">
            <b data-testid="income-value">{formattedIncome}</b>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-primary-foreground md:text-3xl">Expenses</span>

          <span className="text-primary-foreground md:text-2xl">
            <b data-testid="expenses-value">{formattedExpenses}</b>
          </span>
        </div>
      </div>
    </article>
  );
};

export default SummaryBox;

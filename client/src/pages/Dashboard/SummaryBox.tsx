const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Ensures no more than two decimal places
  }).format(number);
  return formattedNumber;
};

interface Values {
  balance: number;
  income: number;
  expenses: number;
}

const SummaryBox = ({ balance, income, expenses }: Values) => {
  console.log(balance);
  const formattedIncome = formatNumber(income);
  const formattedExpenses = formatNumber(expenses);
  const formattedBalance = formatNumber(balance);

  const balanceTotal = income - expenses;

  return (
    <article className="flex flex-col bg-sidebar-primary border border-gray-100 shadow-sm rounded-lg w-[90vw] p-4">
      <div className="flex flex-col mb-4">
        <span className="text-xl text-primary-foreground">Balance</span>
        <span className="text-3xl text-primary-foreground">
          <b>{formatNumber(balanceTotal)} </b>
        </span>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-primary-foreground">Income</span>

          <span className="text-primary-foreground">
            <b>{formattedIncome}</b>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-primary-foreground">Expenses</span>

          <span className="text-primary-foreground">
            <b>{formattedExpenses}</b>
          </span>
        </div>
      </div>
    </article>
  );
};

export default SummaryBox;

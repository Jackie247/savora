interface TransactionRowProps {
  title: string;
  value: string;
  type: "income" | "expense";
  date: string;
  icon: string;
}

const TransactionRow = ({
  title,
  value,
  type,
  date,
  icon,
}: TransactionRowProps) => {
  return (
    <div className="flex items-center h-14 border-gray-200 relative">
      {/* Icon */}
      <div className="bg-gray-300 p-1 rounded-sm">
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>

      <div className="flex flex-col flex-1 ml-2">
        <span>{title}</span>
        <span className="text-xs text-gray-400">Subscription</span>
      </div>

      <div className="flex flex-col pr-2">
        {type === "expense" ? (
          <span className="text-right text-red-500">
            - <b>£{`${value}`}</b>
          </span>
        ) : (
          <span className="text-right text-green-500">
            + <b>£{value}</b>
          </span>
        )}

        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </div>
  );
};

export default TransactionRow;

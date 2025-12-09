const formatNumber = (number: number) => {
		const formattedNumber = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "GBP",
			minimumFractionDigits: 2, // Ensures at least two decimal places
			maximumFractionDigits: 2, // Ensures no more than two decimal places
		}).format(number);
		return formattedNumber;
	};

const SummaryBox = ({ balance, income, expenses }) => {
	const formattedIncome = formatNumber(income);
	const formattedExpenses = formatNumber(expenses);
	const formattedBalance = formatNumber(balance);

	return (
		<article className="flex flex-col bg-primary border border-gray-100 shadow-sm rounded-lg w-[90vw] p-4">
			<div className="flex flex-col mb-4">
				<span className="text-xl text-white">Balance</span>
				<span className="text-3xl text-white">
					<b>{formattedBalance} </b>
				</span>
			</div>

			<div className="flex justify-between">
				<div className="flex flex-col">
					<span className="text-accent-text">Income</span>

					<span className="text-white">
						<b>{formattedIncome}</b>
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-accent-text">Expenses</span>

					<span className="text-white">
						<b>{formattedExpenses}</b>
					</span>
				</div>
			</div>
		</article>
	);
};

export default SummaryBox;

import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import useExpensesStore from "../../store/expenses.store.ts";
import useModalStore from "../../store/modal.store.ts";
import useTableStore from "../../store/table.store.ts";
import EditRowModal from "./EditRowModal.tsx";
import Table from "./Table.tsx";

function Expenses() {
	const { isOpen } = useModalStore();
	const { currentTab, updateCurrentTab } =
		useExpensesStore();
	const {tables, total, calculateTotal} = useTableStore();

	const handleTabSelect = (e) => {
		console.log(e.target.value);
		updateCurrentTab(e.target.value);
	};

	useEffect(() => {
  		calculateTotal(currentTab);
	}, [tables, currentTab]);

	return (
		<div className="flex flex-col min-h-screen">
			<section className="bg-blue-900">
				{/* This will contain feature buttons like, pagination for next month, prev month. calendar to go to specific month. Add transaction, etc.*/}
				<a href="/">
					<div className="flex p-4">
						<ChevronLeft className="text-white" />
						<button className="text-white" type="button">
							Dashboard
						</button>
					</div>
				</a>

				<div className="text-white flex flex-col p-4">
					<span>Total Expenses</span>
					<span className="text-4xl">
						<b>£{total}</b>
					</span>
				</div>
				<div className="flex p-4 space-x-4">
					<button
						type="button"
						value="fixedPayments"
						className="bg-white border border-gray-100 shadow rounded-xs p-1 px-2 justify-center"
						onClick={handleTabSelect}
					>
						Fixed Payments
					</button>
					<button
						type="button"
						value="investments"
						className="bg-blue-900 text-white border border-gray-100 shadow-sm px-2 rounded-xs p-1 justify-center"
						onClick={handleTabSelect}
					>
						Investments
					</button>
					<button
						type="button"
						value="credit"
						className="bg-blue-900 text-white border border-gray-100 shadow-sm px-2 rounded-xs p-1 justify-center"
						onClick={handleTabSelect}
					>
						Credit
					</button>
				</div>
			</section>
			{currentTab && (
				<section className="flex-1 bg-gray-200 flex-col flex">
					<Table tableName={currentTab} />
				</section>
			)}
			{isOpen && <EditRowModal />}
		</div>
	);
}

export default Expenses;

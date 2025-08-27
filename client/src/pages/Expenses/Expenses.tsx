import Table from "../../components/Table.tsx";
import Modal from "../../components/Modal.tsx";
import useModalStore from "../../store/modal.store.ts";
import { useEffect } from "react";
import useTableStore from "../../store/table.store.ts";
import useExpensesStore from "../../store/expenses.store.ts";
import type { TableType } from "../../../../types/table.types.ts";

function Expenses() {
	const { isOpen } = useModalStore();
	const { getRows } = useTableStore();
	const { currentTab, updateCurrentTab } = useExpensesStore();

	const handleTabSelect = (e) => {
		console.log(e.target.value);
		updateCurrentTab(e.target.value);
	};

	const convertToTitle = (tab: TableType) => {
		switch (tab) {
			case "fixedPayments":
				return "Fixed Payments";
			case "investments":
				return "Investments";
			case "credit":
				return "Credit";
			default:
				return "Table";
		}
	};

	useEffect(() => {
		getRows();
	}, [getRows]);

	return (
		<div>
			<section>
				{/* This will contain feature buttons like, pagination for next month, prev month. calendar to go to specific month. Add transaction, etc.*/}
				<div className="flex justify-between p-8">
					<div>
						<button type="button">Prev</button>
						<button type="button">Next</button>
					</div>
					<div>
						<button
							type="button"
							value="fixedPayments"
							className="mx-2 bg-blue-300 p-2 rounded-sm"
							onClick={handleTabSelect}
						>
							Fixed Payments
						</button>
						<button
							type="button"
							value="investments"
							className="mx-2 bg-blue-300 p-2 rounded-sm"
							onClick={handleTabSelect}
						>
							Investments
						</button>
						<button
							type="button"
							value="credit"
							className="mx-2 bg-blue-300 p-2 rounded-sm"
							onClick={handleTabSelect}
						>
							Credit
						</button>
					</div>
					<div>Calender</div>
				</div>
			</section>
			<section>
				{currentTab && (
					<article className="w-full">
						<h2>{convertToTitle(currentTab)}</h2>
						<Table tableName={currentTab} />
					</article>
				)}
			</section>
			{isOpen && <Modal />}
		</div>
	);
}

export default Expenses;

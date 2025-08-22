import Table from "../../components/Table.tsx";
import Modal from "../../components/Modal.tsx";
import useModalStore from "../../store/modal.store.ts";
import { useEffect } from "react";
import useTableStore from "../../store/table.store.ts";

function Expenses() {
	const { isOpen } = useModalStore();
	const {tables, getRows} = useTableStore()

	useEffect(() => {
		getRows()
	},[])

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
						<button>Fixed Payments</button>
						<button>
							Investments
						</button>
						<button>Credit</button>
					</div>
					<div>Calender</div>
				</div>
			</section>
			<section>
				<article className="w-full">
					<h2>Fixed Payments</h2>
					<Table tableName="fixedPayments" />
				</article>
				<article>
					<h2>Investments</h2>
					<Table tableName="investments" />
				</article>
				<article>
					<h2>Credit</h2>
					<Table tableName="credit" />
				</article>
			</section>
			{isOpen && <Modal />}
		</div>
	);
}

export default Expenses;

import Table from "../../components/Table.tsx";
import Modal from "../../components/Modal.tsx";
import useModalStore from "../../store/modal.store.ts";

function Finances() {
	const { isOpen, openModal } = useModalStore();

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
						{/* Open a modal window to choose from the tables and add certain row data */}
						<button type="button" onClick={() => openModal()}>
							Add Row
						</button>
					</div>
					<div>Calender</div>
				</div>
			</section>
			<section>
				<article className="w-full">
					<h2>Fixed Payments</h2>
				</article>
				<article>
					<h2>Investments</h2>
					<Table
						tableName="investments"
					/>
				</article>
				<article>
					<h2>Credit</h2>
				</article>
			</section>
			{isOpen && <Modal />}
		</div>
	);
}

export default Finances;

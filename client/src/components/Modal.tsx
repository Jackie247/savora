import type { TableType, TableRowData } from "../../../types/table.types";
import useModalStore from "../store/modal.store";
import useTableStore from "../store/table.store";

const Modal = () => {
	const { modalValues, resetModal, closeModal, updateModalValue, submitForm } =
		useModalStore();

	const { updateRow } = useTableStore();

	const handleUpdate = (
		table: TableType,
		id: string,
		fieldValues: Partial<TableRowData>,
	) => {
		updateRow(table, id, fieldValues);
		closeModal();
	};

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen">
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex justify-between align-middle mb-4">
						<h2 className="text-lg font-semibold">Add New Row</h2>
						<button type="button" onClick={closeModal}>
							X
						</button>
					</div>
					<form action="/finance" method="POST" onSubmit={submitForm}>
						<select
							id="modal-table-dropdown"
							className="mb-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							value={modalValues.expenseType}
							onChange={(e) => updateModalValue("expenseType", e.target.value)}
						>
							<option value="fixed">Fixed Payments</option>
							<option value="investments">Investments</option>
							<option value="credit">Credit</option>
						</select>
						<div className="mb-4">
							<label
								htmlFor="name-input"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								id="name-input"
								type="text"
								value={modalValues.name || ""}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) => updateModalValue("name", e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="value-input"
								className="block text-sm font-medium text-gray-700"
							>
								Value
							</label>
							<input
								id="value-input"
								type="text"
								value={modalValues.value || ""}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) => updateModalValue("value", e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="day-input"
								className="block text-sm font-medium text-gray-700"
							>
								Day
							</label>
							<input
								id="day-input"
								type="text"
								value={modalValues.day || ""}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) => updateModalValue("day", e.target.value)}
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="submit"
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
								// onClick={() =>
								// 	handleUpdate(modalValues.table, modalValues.id, {
								// 		name: modalValues.name,
								// 		value: modalValues.value,
								// 		day: modalValues.day,
								// 	})
								// }
							>
								Update
							</button>
							<button
								type="button"
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
								onClick={resetModal}
							>
								Clear
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Modal;

import useModalStore from "../../store/modal.store";
import { useState } from "react";
import ModalField from "../../components/ModalField";
const EditRowModal = () => {
	const { modalValues, resetModal, closeModal, updateModalValue, submitForm } =
		useModalStore();
	const [isRecurring, setIsRecurring] = useState(modalValues.is_recurring);

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-6">
			<div className="bg-white shadow-lg p-6 w-full ">
				<div className="flex justify-between align-middle mb-4">
					<h2 className="text-lg font-semibold">Edit Row</h2>
					<button type="button" onClick={closeModal}>
						X
					</button>
				</div>
				<form
					action="/api/expenses/editExpense"
					method="POST"
					onSubmit={submitForm}
				>
					<ModalField
						type="select"
						label="Type of Expense"
						options={[
							{ value: "fixedPayments", label: "Fixed Payments" },
							{ value: "investments", label: "Investments" },
							{ value: "credit", label: "Credit" },
						]}
						field="expenseType"
						value={modalValues.expenseType}
						updateModalValue={updateModalValue}
					/>
					<ModalField
						label="Name"
						value={modalValues.name || ""}
						updateModalValue={updateModalValue}
						field="name"
					></ModalField>
					<ModalField
						label="Value"
						value={modalValues.value || ""}
						updateModalValue={updateModalValue}
						field="value"
					></ModalField>
					<div className="mb-4 flex justify-between">
						<ModalField
							label="Day"
							value={
								modalValues.expense_date
									? modalValues.expense_date.slice(0, 10) // rendered format "YYYY-MM-DD"
									: ""
							}
							updateModalValue={updateModalValue}
							field="expense_date"
							type="date"
						></ModalField>

						<ModalField
							label="Recurring"
							value={modalValues.is_recurring || false}
							updateModalValue={updateModalValue}
							setIsRecurring={setIsRecurring}
							field="is_recurring"
							type="checkbox"
						></ModalField>
					</div>
					{isRecurring && (
						<ModalField
							type="select"
							label="Recurring Interval"
							options={[
								{ value: "daily", label: "Daily" },
								{ value: "weekly", label: "Weekly" },
								{ value: "monthly", label: "Monthly" },
								{ value: "yearly", label: "Yearly" },
							]}
							field="recurring_interval"
							value={modalValues.expenseType}
							updateModalValue={updateModalValue}
						/>
					)}
					<div className="flex justify-between">
						<button
							type="submit"
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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
	);
};

export default EditRowModal;

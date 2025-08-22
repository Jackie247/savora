import TableRow from "./TableRow";
import type {
	TableComponentProps,
	TableType,
	NewRow,
} from "../../../types/table.types";
import useModalStore from "../store/modal.store";
import useTableStore from "../store/table.store";

const Table = ({ tableName }: TableComponentProps) => {
	const { openModal } = useModalStore();
	const { tables, addRow, getRows } = useTableStore();

	const handleAddRow = (expenseType: TableType) => {
		const row: NewRow = {
			name: "",
			value: 0,
			expenseType: expenseType,
			is_recurring: true,
			// For one-time expenses, set today's date
			expense_date: new Date(),
			// For recurring expenses, default to 1st of month
			recurring_day: 1,
			recurring_interval: undefined,
		};
		// if(expenseType === 'variableExpenses'){
		// 	row.is_recurring = False
		// }
		addRow(row);
	};

	const handleEditRow = (rowId: string) => {
		const row = tables[tableName].find((r) => r.id === rowId);
		if (!row) {
			console.error("Row not found:", rowId);
			return;
		}
		openModal({
			table: tableName,
			...row,
		});
	};

	return (
		<div className="overflow-x-auto">
			<button
				type="button"
				onClick={() => handleAddRow(tableName)}
				className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Row
			</button>

			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{tables[tableName].map((row) =>
							Object.keys(row).map((field) => {
								if (field === "id" || field === "is_recurring" || field === "expenseType") {
									return null;
								} else {
									return (
										<th
											key={field}
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											{field}
										</th>
									);
								}
							}),
						)}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{tables[tableName].map((row) => (
						<TableRow
							key={row.id}
							row={row}
							onEdit={() => handleEditRow(row.id)}
							onDelete={() => handleDeleteRow(tableName, row.id)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

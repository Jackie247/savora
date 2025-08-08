import TableRow from "./TableRow";
import type {TableType, TableComponentProps } from "../../../types/table.types";
import useModalStore from "../store/modal.store";
import useTableStore from "../store/table.store";

const Table = ({
	tableName,
}: TableComponentProps) => {
	const { openModal } = useModalStore();
	const { tables, addRow, deleteRow } = useTableStore();

	const handleEditRow = (rowId: string) => {
		const row = tables[tableName].find(r => r.id === rowId);

		if (!row) {
		console.error("Row not found:", rowId);
		return;
		}

		openModal({
			table: tableName,
			id: row.id,
			name: row.name,
			value: row.value,
			day: row.day,
		});
	};

	return (
		<div className="overflow-x-auto">
			<button
				type="button"
				onClick={() => addRow(tableName)}
				className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Row
			</button>

			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Value
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Day
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{tables[tableName].map((row) => (
						<TableRow
						key={row.id}
						row={row}
						onEdit={() => handleEditRow(row.id)}
						onDelete={() => deleteRow(tableName, row.id)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;

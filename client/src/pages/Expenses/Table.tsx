import TableRow from "./TableRow";
import type {
	TableComponentProps,
	TableType,
	NewRow,
	TableRowData,
} from "../../../../types/table.types";
import useModalStore from "../../store/modal.store";
import useTableStore from "../../store/table.store";
import { useEffect } from "react";
import useAuthStore from "../../store/auth.store";
import { SquarePlus } from "lucide-react";
import convertToTitle from "../../utils/convertToTitle";
import { ChevronDown } from "lucide-react";

const Table = ({ tableName }: TableComponentProps) => {
	const { openModal } = useModalStore();
	const { tables, addRow, getRows, deleteRow } = useTableStore();
	const { currentUserId } = useAuthStore();

	const handleAddRow = async (expenseType: TableType) => {
		const row: NewRow = {
			name: "",
			value: 0,
			expenseType: expenseType,
			is_recurring: true,
			expense_date: new Date(), // For one-time expenses, set today's date
			recurring_day: 1, // For recurring expenses, default to 1st of month
			recurring_interval: undefined,
			user_id: Number(currentUserId),
		};
		// if(expenseType === 'variableExpenses'){
		// 	row.is_recurring = False
		// }
		await addRow(row);
		await getRows(currentUserId);
	};

	const handleEditRow = (rowId: number) => {
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
	const handleDeleteRow = async (tableName: TableType, id: number) => {
		await deleteRow(tableName, id);
		await getRows(currentUserId);
	};

	useEffect(() => {
		getRows(currentUserId);
	}, [getRows]);

	return (
		<div className="p-4 overflow-x-auto flex-1">
			<header className="flex items-center space-x-4 mb-4">
				<h2>{convertToTitle(tableName)}</h2>

				<button
					type="button"
					onClick={() => handleAddRow(tableName)}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded items-center"
				>
					<SquarePlus />
				</button>
				<div className="flex ml-auto items-center space-x-2">
					<span>Sort by</span>
					<ChevronDown />
				</div>
			</header>

			<div className="overflow-x-auto">
				<table className="w-full table-auto border-collapse bg-white rounded rounded-md">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
								Date
							</th>
							<th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
								Name
							</th>
							<th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
								Value
							</th>
							<th className="px-2 py-2"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y">
						{tables[tableName]
							?.filter((row): row is TableRowData => row.id !== undefined)
							?.map((row) => (
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
		</div>
	);
};

export default Table;

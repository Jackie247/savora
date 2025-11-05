import TableRow from "./TableRow";
import type {
	TableComponentProps,
	TableType,
	NewRow,
	TableRowData,
} from "../../../../types/table.types";
import useTableStore from "../../store/table.store";
import { useEffect } from "react";
import useAuthStore from "../../store/auth.store";
import { SquarePlus } from "lucide-react";
import convertToTitle from "../../utils/convertToTitle";
import { ChevronDown } from "lucide-react";

const Table = ({ tableName }: TableComponentProps) => {
	const { tables, addRow, getRows } = useTableStore();
	const { currentUserId } = useAuthStore();

	const handleAddRow = async (expenseType: TableType) => {
		const row: NewRow = {
			name: "",
			value: 0,
			expenseType: expenseType,
			is_recurring: true,
			expense_date: "", // For one-time expenses, set today's date
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

			<div className="bg-white rounded-sm">
				{tables[tableName].map((row) => (
					<TableRow
						row={row}
					></TableRow>
					// <div
					// 	key={row.id}
					// 	className="cursor-pointer hover:bg-blue-50 transition-colors"
					// 	onClick={() => handleEditRow(row.id)}
					// >

					// 	<span className="py-3">
					// 		<button
					// 			onClick={(e) => {
					// 				e.stopPropagation(); // prevent row click
					// 				handleDeleteRow(tableName, row.id);
					// 			}}
					// 			className="p-1 text-red-500 hover:text-red-700 rounded-full"
					// 			aria-label="Delete"
					// 		>
					// 			<X className="w-4 h-4" />
					// 		</button>
					// 	</span>
					// </div>
				))}
			</div>
		</div>
	);
};

export default Table;

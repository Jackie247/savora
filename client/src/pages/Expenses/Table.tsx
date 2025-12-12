import { ChevronDown, SquarePlus } from "lucide-react";
import { useEffect } from "react";
import type {
  NewRow,
  TableComponentProps,
  TableType,
} from "../../../../types/table.types";
import useAuthStore from "../../store/auth.store";
import useTableStore from "../../store/table.store";
import convertToTitle from "../../utils/convertToTitle";
import TableRow from "./TableRow";

const Table = ({ tableName }: TableComponentProps) => {
  const { tables, addRow, getRows } = useTableStore();
  const { session } = useAuthStore();

  const handleAddRow = async (expenseType: TableType) => {
    const row: NewRow = {
      name: "",
      value: 0,
      expense_type: expenseType,
      is_recurring: true,
      expense_date: null, // For one-time expenses, set today's date
      recurring_day: 1, // For recurring expenses, default to 1st of month
      recurring_interval: undefined,
    };
    // if(expenseType === 'variableExpenses'){
    // 	row.is_recurring = False
    // }
    await addRow(row);
    await getRows();
  };

  useEffect(() => {
    getRows();
  }, [getRows]);

  return (
    <div className="p-4 overflow-x-auto flex-1 bg-background">
      <header className="flex items-center space-x-4 mb-4 bg-white">
        <h2>{convertToTitle(tableName)}</h2>
        <button
          type="button"
          onClick={() => handleAddRow(tableName)}
          className="font-bold rounded items-center"
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
          <TableRow row={row} key={row.id}></TableRow>
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

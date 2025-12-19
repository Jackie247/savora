import { ChevronDown, SquarePlus } from "lucide-react";
import { useEffect } from "react";
import type {
  NewRow,
  TableComponentProps,
} from "../../../../types/table.types";
import { useTables, useAddRow, useGetRows } from "../../store/table.store";
import convertToTitle from "../../lib/convertToTitle";
import TableRow from "./TableRow";

const Table = ({ tableName }: TableComponentProps) => {
  const tables = useTables();
  const addRow = useAddRow();
  const getRows = useGetRows();

  const handleAddRow = async (expense_type: string) => {
    // probably dont need this because DB has default values.
    const newRow: NewRow = {
      name: "",
      value: 0,
      expense_type: expense_type,
      is_recurring: true,
      expense_date: null, // For one-time expenses, set today's date
      recurring_day: null, // For recurring expenses, default to 1st of month
      recurring_interval: null,
      recurring_day_of_week: null,
    };

    await addRow(newRow);
    await getRows();
  };

  useEffect(() => {
    // ran once on component mount, which means tableName gets set once, so need to set it as dependency.
    getRows();
  }, [getRows]);

  return (
    <div className="p-4 overflow-x-auto flex-1 bg-background md:px-10">
      <span className="flex items-center space-x-4 mb-4 md:text-3xl md:py-2">
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
      </span>

      <div>
        {tables[tableName].map((row) => (
          <TableRow row={row} key={row.id}></TableRow>
        ))}
      </div>
    </div>
  );
};

export default Table;

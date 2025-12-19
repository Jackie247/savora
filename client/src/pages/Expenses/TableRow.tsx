/* eslint-disable react/react-in-jsx-scope */
import { CircleX, Hamburger, MoreVertical, SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ExpenseData } from "../../../../types/table.types";
import { useOpenModal } from "../../store/modal.store";
import { useDeleteRow, useGetRows } from "../../store/table.store";

interface TableRowProps {
  row: ExpenseData;
}
const TableRow = ({ row }: TableRowProps) => {
  const openModal = useOpenModal();
  const getRows = useGetRows();
  const deleteRow = useDeleteRow();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEditRow = (row: any) => openModal({ ...row });

  const handleDeleteRow = async (id: number) => {
    await deleteRow(id);
    await getRows();
  };

  const formatDay = (day: number) => {
    // 1 st, 2 nd 3 rd, 4 - 0 th
    if (day > 3 && day < 10) {
      return `${day}th`;
    }

    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedPrice = row.value ? row.value.toFixed(2) : 0;

  return (
    <div className="flex items-center h-14 border-b border-gray-200 px-2 relative md:my-6">
      {/* Icon */}
      <div className="bg-gray-300 p-2 rounded-sm">
        <Hamburger className="md:h-12 md:w-12" />
      </div>

      <div className="flex flex-col flex-1 ml-2 md:ml-4 md:text-2xl md:font-medium">
        <span>{row.name ? row.name : "No name"}</span>
        <span className="text-xs text-gray-400 md:text-sm md:font-semibold">
          Subscription
        </span>
      </div>

      <div className="flex flex-col pr-2 md:text-3xl">
        <span className="text-right">
          <b>£{formattedPrice}</b>
        </span>
        {row.expense_date ? (
          <span className="text-xs text-gray-400 md:text-sm">
            {row.expense_date.split("-").reverse().join("-")}
          </span>
        ) : (
          <span className="text-xs text-gray-400 md:text-sm md:text-right">
            {row.recurring_day && `Due ${formatDay(row.recurring_day)}`}
            {row.recurring_day_of_week &&
              `Due every ${row.recurring_day_of_week}`}
            {row.recurring_interval === "daily" && "Due today"}
          </span>
        )}
        {/* <span className="text-xs text-gray-400">
          {row.expense_date
            ? row.expense_date.split("-").reverse().join("-")
            : row.recurring_day
            ? `Due ${formatDay(row.recurring_day)}`
            : "No date"}
        </span> */}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1"
          aria-label="More actions"
        >
          <MoreVertical className="w-4 h-4 text-gray-600 md:w-8 md:h-8" />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 bg-white border border-gray-200 rounded shadow-md z-10 w-32 md:text-3xl md:w-50 md:h-30 md:flex md:flex-col md:justify-evenly md:rounded-md"
            style={{}}
          >
            <button
              type="button"
              onClick={() => {
                handleEditRow(row);
                setMenuOpen(false);
              }}
              className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-100 md:font-medium"
            >
              <SquarePen className="w-4 h-4 mr-2 md:w-8 md:h-8 md:mr-6 " />
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                handleDeleteRow(row.id);
                setMenuOpen(false);
              }}
              className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-100 text-red-600 md:font-medium"
            >
              <CircleX className="w-4 h-4 mr-2 md:w-8 md:h-8 md:mr-6" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableRow;

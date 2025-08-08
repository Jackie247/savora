import type { TableRowComponentProps } from "../../../types/table.types";

const TableRow = ({ row, onEdit, onDelete }: TableRowComponentProps) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.value}</td>
      <td className="px-6 py-4 whitespace-nowrap">{row.day}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button type="button" onClick={onEdit} className="text-blue-600 hover:text-blue-900">
          Edit
        </button>
        <button type="button" onClick={onDelete} className="ml-2 text-red-600 hover:text-red-900">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow
import { CircleX, Hamburger, MoreVertical, SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TableRowComponentProps } from "../../../../types/table.types";
import useAuthStore from "../../store/auth.store";
import useModalStore from "../../store/modal.store";
import useTableStore from "../../store/table.store";

const TableRow = ({ row }: TableRowComponentProps) => {
	const { openModal } = useModalStore();
	const { getRows, deleteRow } = useTableStore();
	const { currentUserId } = useAuthStore();

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleEditRow = (row) => openModal({ ...row });

	const handleDeleteRow = async (id: number) => {
		await deleteRow(id);
		await getRows(currentUserId);
	};

	const formatDay = (day: number) => {
		// 1 st, 2 nd 3 rd, 4 - 0 th
		if(day > 3 && day < 21){
			return `${day}st`
		}
		switch(day % 10){
			case 1:
				return `${day}st`
			case 2:
				return `${day}nd`
			case 3:
				return `${day}rd`
			default:
				return `${day}th`
		}
	}

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
		<div className="flex items-center h-14 border-b border-gray-200 px-2 relative">
			{/* Icon */}
			<div className="bg-gray-300 p-2 rounded-sm">
				<Hamburger />
			</div>

			<div className="flex flex-col flex-1 ml-2">
				<span>{row.name ? row.name : "No name"}</span>
				<span className="text-xs text-gray-400">Subscription</span>
			</div>

			<div className="flex flex-col pr-2">
				<span className="text-right">
					<b>£{formattedPrice}</b>
				</span>
				<span className="text-xs text-gray-400">
					{row.expense_date
						? row.expense_date.split("-").reverse().join("-")
						: row.recurring_day ? `Due ${formatDay(row.recurring_day)}` : "No date"}
				</span>
			</div>

			<div className="relative" ref={menuRef}>
				<button
					type="button"
					onClick={() => setMenuOpen((prev) => !prev)}
					className="p-1"
					aria-label="More actions"
				>
					<MoreVertical className="w-4 h-4 text-gray-600" />
				</button>

				{menuOpen && (
					<div
						className="absolute right-0 bg-white border border-gray-200 rounded shadow-md z-10 w-32"
						style={{}}
					>
						<button
							type="button"
							onClick={() => {
								handleEditRow(row);
								setMenuOpen(false);
							}}
							className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-100"
						>
							<SquarePen className="w-4 h-4 mr-2" /> Edit
						</button>
						<button
							type="button"
							onClick={() => {
								handleDeleteRow(row.id);
								setMenuOpen(false);
							}}
							className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-100 text-red-600"
						>
							<CircleX className="w-4 h-4 mr-2" /> Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TableRow;

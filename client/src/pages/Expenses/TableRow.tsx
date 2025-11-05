import { useState, useEffect, useRef } from "react";
import { CircleX, SquarePen, Hamburger, MoreVertical } from "lucide-react";
import type { TableRowComponentProps } from "../../../../types/table.types";
import useModalStore from "../../store/modal.store";
import useTableStore from "../../store/table.store";
import useAuthStore from "../../store/auth.store";

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
	const reversedDate = `${row.expense_date.split("-")[2]}-${row.expense_date.split("-")[1]}-${row.expense_date.split("-")[0]}`
	
	return (
		<div className="flex items-center h-14 border-b border-gray-200 px-2 relative">
			{/* Hamburger */}
			<div className="bg-gray-300 p-2 rounded-sm">
				<Hamburger />
			</div>

			{/* Row content */}
			<div className="flex flex-col flex-1 ml-2">
				<span>{row.name}</span>
				<span className="text-xs text-gray-400">Subscription</span>
			</div>

			{/* Value */}
			<div className="flex flex-col pr-2">
				<span className="text-right">£{formattedPrice}</span>
				<span className="text-xs text-gray-400">{reversedDate}</span>
			</div>

			{/* Overflow menu */}
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

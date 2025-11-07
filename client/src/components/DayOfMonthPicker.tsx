import { useState } from "react";
import { CalendarDays } from "lucide-react";

const DayOfMonthPicker = () => {
	const daysInMonth = 31;
	const [day, setDay] = useState(1);
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e) => {
		console.log(e.target.value);
		setDay(e.target.value);
		setIsOpen(false);
	};

	const handleOpenPicker = () => {
		setIsOpen(true);
	};

	const handleClosePicker = () => {
		setIsOpen(false);
	};

	const dayButtons = [];
	for (let i = 1; i <= daysInMonth; i++) {
		dayButtons.push(
			<button type="button" className="p-1" onClick={handleClick} value={i}>
				{i}
			</button>,
		);
	}

	return (
		<div className="mb-4">
			<div className="flex justify-between">
				<div>
					<label htmlFor="day-month-picker">Day Of The Month: </label>
					<span id="day-month-picker">{day}</span>
				</div>

				{!isOpen && (
					<button type="button" onClick={handleOpenPicker}>
						<CalendarDays />
					</button>
				)}

				{isOpen && (
					<button type="button" onClick={handleClosePicker}>
						X
					</button>
				)}
			</div>

			{isOpen && (
				<div className="border-2 p-2 grid grid-cols-7">{dayButtons}</div>
			)}
		</div>
	);
};

export default DayOfMonthPicker;

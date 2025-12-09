import { CalendarDays } from "lucide-react";
import { useState } from "react";

const DayOfWeekPicker = ({ recurringDay, updateModalValue }) => {
	const [day, setDay] = useState(recurringDay || 1);
	// const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e) => {
		const inputNumber = Number(e.target.value)
		// console.log(inputNumber);
		setDay(inputNumber);
		updateModalValue("recurring_day_of_week", inputNumber)
		// setIsOpen(false);
	};

	// const handleOpenPicker = () => {
	// 	setIsOpen(true);
	// };

	// const handleClosePicker = () => {
	// 	setIsOpen(false);
	// };

	// const dayButtons = [];
	// for (let i = 1; i <= daysInMonth; i++) {
	// 	dayButtons.push(
	// 		<button type="button" className="p-1" onClick={handleClick} value={i}>
	// 			{i}
	// 		</button>,
	// 	);
	// }

	return (
		<div className="mb-4">
			<div className="flex justify-between">
                <label htmlFor="day-week-picker">Day Of The Week: </label>
                <select id="day-week-picker">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                </select>
            </div>
		</div>
	);
};

export default DayOfWeekPicker;

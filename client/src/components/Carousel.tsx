import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Carousel = ({ children }) => {
	const [index, setIndex] = useState(0);
	const count = React.Children.count(children);

	const prev = () => index > 0 && setIndex(index - 1);
	const next = () => index < count - 1 && setIndex(index + 1);

	return (
		<div className="w-full flex flex-col items-center">
			{/* slides */}
			<div className="w-full overflow-hidden">
				<div
					className="flex transition-transform duration-400"
					style={{ transform: `translateX(-${index * 100}%)` }}
				>
					{React.Children.map(children, (child) => (
						<div className="w-full flex-shrink-0 flex justify-center">
							{child}
						</div>
					))}
				</div>
			</div>

			{/* nav arrows + dots */}
			<div className="flex items-center justify-center space-x-4 mt-4">
				<button
					type="button"
					onClick={prev}
					disabled={index === 0}
					className={index === 0 ? "text-gray-400" : ""}
				>
					<ChevronLeft />
				</button>

				<div className="flex space-x-2">
					{Array.from({ length: count }).map((_, i) => (
						<button
							type="button"
							key={i}
							onClick={() => setIndex(i)}
							className={`h-2 w-2 rounded-full ${
								i === index ? "bg-gray-800" : "bg-gray-400"
							}`}
						/>
					))}
				</div>

				<button
					type="button"
					onClick={next}
					disabled={index === count - 1}
					className={index === count - 1 ? "text-gray-400" : ""}
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};

export default Carousel;

interface Option {
	value: string;
	label: string;
}

interface ModalFieldProps {
	type?: string;
	field: string;
	value: string | number | boolean;
	updateModalValue: (field: string, value: any) => void;
	setIsRecurring?: (isRecurring: boolean) => void;
	options?: Option[];
	label?: string;
}

const ModalField: React.FC<ModalFieldProps> = ({
	type = "text",
	field,
	value,
	updateModalValue,
	setIsRecurring,
	options,
	label,
}) => {
	let inputField: React.ReactElement;

	switch (type) {
		case "select":
			inputField = (
				<select
					id={`${field}-input`}
					value={value as string}
					onChange={(e) => updateModalValue(field, e.target.value)}
					className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 max-h-8 overflow-y-auto"
				>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			);
			break;

		case "checkbox":
			inputField = (
				<input
					id={`${field}-input`}
					type="checkbox"
					checked={Boolean(value)}
					onChange={(e) => {
						updateModalValue(field, e.target.checked);
						setIsRecurring?.(e.target.checked);
					}}
					className="mt-2 p-1 block"
				/>
			);
			break;

		case "date":
			inputField = (
				<input
					id={`${field}-input`}
					type="date"
					value={value as string}
					onChange={(e) => {
						updateModalValue(field, e.target.value);
					}}
					className="mt-1 block border-gray-300"
				/>
			);
			break;
			
		default:
			inputField = (
				<input
					id={`${field}-input`}
					type={type}
					value={value as string}
					onChange={(e) => updateModalValue(field, e.target.value)}
					className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
				/>
			);
	}

	return (
		<div className="mb-4">
			{label && (
				<label
					htmlFor={`${field}-input`}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			{inputField}
		</div>
	);
};

export default ModalField;

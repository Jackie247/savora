import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";

const initialModalValues = {
	name: "",
	value: 0,
	expenseType: "",
	is_recurring: false,
	expense_date: "",
	recurring_day: "",
	recurring_interval: "",
};

export interface ModalStore {
	isOpen: boolean;
	modalValues: ModalFields;
	updateModalValue: (field: string, value: string | number | boolean | Date) => void;
	openModal: (fieldValues: Partial<ModalFields>) => void;
	resetModal: () => void;
	closeModal: () => void;
	submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const useModalStore = create<ModalStore>()((set, get) => ({
	isOpen: false,
	modalValues: initialModalValues,
	updateModalValue: (field, value) => {
		set((state) => ({
			modalValues: {
				...state.modalValues,
				[field]: value,
			},
		}));
	},
	openModal: (fieldValues: Partial<ModalFields>) =>
		set((state) => ({
			isOpen: true,
			modalValues: {
				...state.modalValues,
				...fieldValues,
			},
		})),
	closeModal: () => set({ isOpen: false }),
	resetModal: () => set({ modalValues: initialModalValues }),
	submitForm: async (e) => {
		e.preventDefault();
		console.log(`Modal values submitted are ${JSON.stringify(get().modalValues, null, 2)}`)
		const { id, name, value, expenseType, is_recurring, expense_date, recurring_day, recurring_interval } = get().modalValues;
		const payload = { id, name, value, recurring_day, expenseType };

		console.log(`Form data: ${JSON.stringify(payload, null, 2)}`);
		try {
			const response = await fetch("/api/expenses/editExpense", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			if (!response) {
				throw new Error("Network response is not OK");
			}
			const result = await response.json();

			console.log("Success", result);

			get().closeModal();
			useTableStore.getState().getRows(useAuthStore.getState().currentUserId);
		} catch (error) {
			console.log("Error:", error);
		}
	},
}));

export default useModalStore;

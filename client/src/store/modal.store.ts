import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";
import useTableStore from "./table.store";
import useAuthStore from "./auth.store";

const initialModalValues = {
	name: "",
	value: 0,
	expenseType: "",
	is_recurring: false,
	expense_date: new Date(),
	recurring_day: new Date(),
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
		const { id, name, value, recurring_day, expenseType } = get().modalValues;
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

import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";
import useAuthStore from "./auth.store";
import useTableStore from "./table.store";

const initialModalValues: Omit<ModalFields, 'id'> = {
	name: "",
	value: 0,
	expenseType: "",
	is_recurring: false,
	expense_date: "",
	recurring_day: "",
	recurring_interval: "",
	recurring_day_of_week: "",
};

export interface ModalStore {
	isOpen: boolean;
	modalValues: ModalFields;
	updateModalValue: (field: string, value: string | number | boolean) => void;
	openModal: (fieldValues: Partial<ModalFields>) => void;
	resetValue: (field: keyof Omit<ModalFields, 'id'>) => void;
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
	resetValue: (field) =>
		set((state) => ({
			...state,
			modalValues: {
				...state.modalValues,
				[field]: initialModalValues[field],
			},
		})),
	resetModal: () => set({ modalValues: initialModalValues }),
	submitForm: async (e) => {
		e.preventDefault();

		const state = get()
		if(state.modalValues.is_recurring){
			state.resetValue("expense_date")	
		}else{
			state.resetValue("recurring_day")
			state.resetValue("recurring_day_of_week")
		}
		
		const payload = get().modalValues;
		
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
			await response.json();
			get().closeModal();
			useTableStore.getState().getRows(useAuthStore.getState().currentUserId);
		} catch (error) {
			console.log("Error:", error);
		}
	},
}));

export default useModalStore;

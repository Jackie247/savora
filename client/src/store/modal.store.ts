import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";
import useAuthStore from "./auth.store";
import useTableStore from "./table.store";

const initialModalValues: Omit<ModalFields, 'id'> = {
	name: "",
	value: 0,
	expense_type: "",
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
}

const useModalStore = create<ModalStore>()((set) => ({
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
}));

export default useModalStore;

import { create } from "zustand";
import type { ExpenseData } from "../../../types/table.types"

const initialModalValues: Omit<ExpenseData, 'id'> = {
	name: "",
	value: 0,
	expense_type: "",
	is_recurring: false,
	expense_date: null,
	recurring_day: null,
	recurring_interval: null,
	recurring_day_of_week: null,
};

export interface ModalStore {
	isOpen: boolean;
	modalValues: Partial<ExpenseData>;
	updateModalValue: (field: string, value: string | number | boolean) => void;
	openModal: (fieldValues: Partial<ExpenseData>) => void;
	resetValue: (field: keyof Omit<ExpenseData, 'id'>) => void;
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
	openModal: (fieldValues: Partial<ExpenseData>) =>
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

export const useIsOpen = () => useModalStore((state) => state.isOpen)
export const useModalValues = () => useModalStore((state) => state.modalValues)
export const useUpdateModalValue = () => useModalStore((state) => state.updateModalValue)
export const useOpenModal = () => useModalStore((state) => state.openModal)
export const useCloseModal = () => useModalStore((state) => state.closeModal)
export const useResetValue = () => useModalStore((state) => state.resetValue)
export const useResetModal = () => useModalStore((state) => state.resetModal)

export default useModalStore;

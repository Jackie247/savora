import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";

const initialModalValues = { table: "", name: "", value: "", day: "" };

export interface ModalStore {
	isOpen: boolean;
	modalValues: ModalFields;
	updateModalValue: (field: string, value: string) => void;
	openModal: (fieldValues: Partial<ModalFields>) => void;
	resetModal: () => void;
	closeModal: () => void;
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
	// submitForm: (e) => {
	// 	e.preventDefault();
	// },
}));

export default useModalStore;

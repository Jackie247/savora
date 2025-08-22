import { create } from "zustand";
import type { ModalFields } from "../../../types/modal.types";

const initialModalValues = { expenseType: "", name: "", value: "", day: "" };

export interface ModalStore {
	isOpen: boolean;
	modalValues: ModalFields;
	updateModalValue: (field: string, value: string) => void;
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
		const { id, name, value, day, expenseType } = get().modalValues;
		const payload = { id, name, value, day, expenseType };

		console.log(`Form data: ${JSON.stringify(payload, null, 2)}`)
		try{
			const response = await fetch('/api/expenses/editExpense', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				}
				,body: JSON.stringify(payload)
			})	
			if(!response){
				throw new Error('Network response is not OK')
			}
			const result = await response.json()

			console.log('Success', result)

			get().closeModal()
		}catch(error){
			console.log("Error:", error)
		}
	},
}));

export default useModalStore;

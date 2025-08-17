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
	submitForm: (e) => void;
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
		const data = {
			...get().modalValues
		}
		console.log(`Form data: ${JSON.stringify(data, null, 2)}`)
		try{
			const response = await fetch('/api/expenses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				}
				,body: JSON.stringify(data)
			})	
			if(!response){
				throw new Error('Network response is not OK')
			}
			const result = await response.json()
			console.log('Success', result)
		}catch(error){
			console.log("Error:", error)
		}
	},
}));

export default useModalStore;

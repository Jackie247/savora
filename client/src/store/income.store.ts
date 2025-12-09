import { create } from "zustand";

export interface IncomeStore {
    currentIncome: number,
    updateCurrentIncome: (num: number) => void
}

const useIncomeStore = create<IncomeStore>()((set, get) => ({
    currentIncome: 0,
    updateCurrentIncome: (num) => {
        set(() => ({
            currentIncome: num
        }))
    }
}))

export default useIncomeStore;

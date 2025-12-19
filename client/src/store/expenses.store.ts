import { create } from "zustand";

export interface ExpenseStore {
    currentTab: string
    updateCurrentTab: (table: string) => void;
}

const useExpensesStore = create<ExpenseStore>()((set) => ({
    currentTab: "fixedPayments",
    updateCurrentTab: (table) => {
        set(() => ({
            currentTab: table
        }))
    },
}))

export const useCurrentTab = () => useExpensesStore((state) => state.currentTab);
export const useUpdateCurrentTab = () => useExpensesStore((state) => state.updateCurrentTab)


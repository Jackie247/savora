import { create } from "zustand";
import type { TableType } from "../../../types/table.types";

export interface ExpenseStore {
    currentTab: TableType
    updateCurrentTab: (table: TableType) => void;
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


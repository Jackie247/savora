import { create } from "zustand";
import type { TableType } from "../../../types/table.types";

export interface AccountsStore {
    currentTab: TableType
    updateCurrentTab: (table: TableType) => void;
}

const useExpensesStore = create<AccountsStore>()((set) => ({
    currentTab: "jobs",
    updateCurrentTab: (table) => {
        set(() => ({
            currentTab: table
        }))
    },
}))

export default useExpensesStore;

import { create } from "zustand";

export interface AccountsStore {
    currentTab: string
}

const useExpensesStore = create<AccountsStore>()(() => ({
    currentTab: "jobs",
}))

export default useExpensesStore;

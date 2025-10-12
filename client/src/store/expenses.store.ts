import { create } from "zustand";
import type { TableType } from "../../../types/table.types";

export interface ExpenseStore {
    currentTab: TableType
    currentTabTotal: number
    updateCurrentTab: (table: TableType) => void;
    getCurrentTabTotal: (userId: number, currentTab:string) => void;
}

const useExpensesStore = create<ExpenseStore>()((set, get) => ({
    currentTab: "fixedPayments",
    currentTabTotal: 0,
    updateCurrentTab: (table) => {
        set(() => ({
            currentTab: table
        }))
    },
    getCurrentTabTotal: async (userId, currentTab) => {
        try{
			const response = await fetch(`/api/expenses/?userId=${userId}`)	
			if(!response){
				throw new Error('Network response is not OK')
			}
			const result = await response.json()
            // console.log(result)
            // console.log(JSON.stringify(result, null, 2))
            // console.log(currentTab)
            let total = 0
            result.forEach((transaction)=> {
                if (transaction.expenseType === currentTab){
                    total += transaction.value
                }
            })
            // console.log(total.toFixed(2))
            set(() => ({
                currentTabTotal: total.toFixed(2)
            }))
            
		}catch(error){
			console.log("Error:", error)
		}
    }

}))

export default useExpensesStore;

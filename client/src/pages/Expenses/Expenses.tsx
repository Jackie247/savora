/* eslint-disable react/react-in-jsx-scope */
import { Bell, ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import {
  useCurrentTab,
  useUpdateCurrentTab,
} from "../../store/expenses.store.ts";
import { useIsOpen } from "../../store/modal.store.ts";
import {
  useTables,
  useCurrentTableTotal,
  useCalculateTableTotal,
} from "../../store/table.store.ts";
import EditRowModal from "./EditRowModal.tsx";
import Table from "./Table.tsx";
import { type MouseEvent } from "react";
function Expenses() {
  const isOpen = useIsOpen();
  const currentTab = useCurrentTab();
  const updateCurrentTab = useUpdateCurrentTab();

  const tables = useTables();
  const currentTableTotal = useCurrentTableTotal();
  const calculateTableTotal = useCalculateTableTotal();

  const handleTabSelect = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    updateCurrentTab(e.currentTarget.value);
  };

  useEffect(() => {
    if (tables && tables[currentTab]?.length > 0) {
      calculateTableTotal(currentTab);
    }
  }, [currentTab, calculateTableTotal, tables]);

  return (
    <div className="flex flex-col bg-sidebar-primary min-h-screen ">
      {/*md:place-self-center md:w-3/4*/}
      <section className="">
        {/* This will contain feature buttons like, pagination for next month, prev month. calendar to go to specific month. Add transaction, etc.*/}
        <a href="/">
          <div className="flex justify-between p-4 bg-white md:p-8 md:text-2xl">
            <ChevronLeft className="md:w-8 md:h-8" />
            <button type="button" className="md:text-2xl">
              Dashboard
            </button>
            <button type="button">
              <Bell className="md:w-8 md:h-8" />
            </button>
          </div>
        </a>

        <div className="text-primary-foreground flex flex-col p-6 md:px-10 md:pb-2">
          <span className="md:text-3xl">Total Expenses</span>
          <span className="text-4xl md:text-6xl md:pt-2">
            <b>£{currentTableTotal}</b>
          </span>
        </div>
        <div className="flex p-4 space-x-4 md:px-10 md:text-2xl">
          <button
            type="button"
            value="fixedPayments"
            className="border bg-background text-card-foreground border-gray-100 shadow rounded-xs p-1 px-2 justify-center"
            onClick={handleTabSelect}
          >
            Fixed Payments
          </button>
          <button
            type="button"
            value="investments"
            className=" bg-background text-card-foreground border border-gray-100 shadow-sm px-2 rounded-xs p-1 justify-center"
            onClick={handleTabSelect}
          >
            Investments
          </button>
          <button
            type="button"
            value="credit"
            className="bg-background text-card-foreground border border-gray-100 shadow-sm px-2 rounded-xs p-1 justify-center"
            onClick={handleTabSelect}
          >
            Credit
          </button>
        </div>
        <div className="h-5"></div>
      </section>
      {currentTab && (
        <section className="flex-1 flex-col flex">
          <Table tableName={currentTab} />
        </section>
      )}
      {isOpen && <EditRowModal />}
    </div>
  );
}

export default Expenses;

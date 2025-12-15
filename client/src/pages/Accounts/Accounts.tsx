/* eslint-disable react/react-in-jsx-scope */
import { Bell, ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import useAccountsStore from "../../store/accounts.store.ts";
import useModalStore from "../../store/modal.store.ts";
import useTableStore from "../../store/table.store.ts";
import EditRowModal from "../Expenses/EditRowModal.tsx";

function Accounts() {
  const { isOpen } = useModalStore();
  const { currentTab, updateCurrentTab } = useAccountsStore();

  const handleTabSelect = (e) => {
    console.log(e.target.value);
    updateCurrentTab(e.target.value);
  };

  useEffect(() => {}, [currentTab]);

  return (
    <div className="flex flex-col bg-sidebar-primary min-h-screen">
      <section className="">
        {/* This will contain feature buttons like, pagination for next month, prev month. calendar to go to specific month. Add transaction, etc.*/}
        <a href="/">
          <div className="flex justify-between p-4 bg-white">
            <ChevronLeft />
            <button type="button">Dashboard</button>
            <button type="button">
              <Bell />
            </button>
          </div>
        </a>

        <div className="text-primary-foreground flex flex-col p-6">
          <span>Total Income</span>
          <span className="text-4xl">
            <b>£0</b>
          </span>
        </div>
        <div className="flex p-4 space-x-4">
          <button
            type="button"
            value="salary"
            className="border bg-background text-card-foreground border-gray-100 shadow rounded-xs p-1 px-2 justify-center"
            onClick={handleTabSelect}
          >
            Salary
          </button>
        </div>
        <div className="h-5"></div>
      </section>
      {currentTab && (
        <section className="p-4 flex-1 flex-col flex bg-background">
          <h2 className="text-2xl">Income</h2>
          <article className="bg-background">
            <div>
              <span>Job 1</span>
            </div>
          </article>
        </section>
      )}
      {isOpen && <EditRowModal />}
    </div>
  );
}

export default Accounts;

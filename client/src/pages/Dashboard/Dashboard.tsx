/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import { useExpensesTotal, useGetRows } from "../../store/table.store";
import SummaryBox from "./SummaryBox";
import WelcomeCard from "./WelcomeCard";
import TransctionsHistory from "./TransactionsHistory";
import { useSession, useLoading } from "@/store/auth.store";
import UpcomingTransactions from "./UpcomingTransactions";
import TransactionBreakdown from "./TransactionsBreakdown";
import GithubLogo from "../../assets/icons/github.svg";
import TransactionsCalendar from "./TransactionsCalendar";

function Dashboard() {
  const getRows = useGetRows();
  const expensesTotal = useExpensesTotal();
  const session = useSession();
  const loading = useLoading();

  useEffect(() => {
    if (!loading && session) {
      getRows();
    }
  }, [loading, session, getRows]);

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      <div className="hidden md:block">
        <Header />
      </div>

      <div className="flex-1 ">
        <WelcomeCard firstName={"John"} lastName={"Doe"} />
        <div className="relative z-10 -mt-60 flex justify-center ">
          <SummaryBox income={0} expenses={expensesTotal} />
        </div>
        <UpcomingTransactions />
        <TransactionsCalendar />
        <div className="md:flex md:w-full md:px-10 lg:px-20 xl:px-60">
          <TransactionBreakdown></TransactionBreakdown>
          <TransctionsHistory />
        </div>
      </div>

      <div>
        <footer className="p-6 md:px-10 lg:px-20 xl:px-60">
          <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent mb-8"></div>
          <span className="text-2xl">Savora</span>

          <ul className="flex space-x-5 my-5">
            <li>
              <span className="sr-only">Github</span>
              <img src={GithubLogo} className="h-6 w-6"></img>
            </li>
            <li>Linkedin</li>
          </ul>

          <nav>
            <h6 className="text-xl">Navigation</h6>
            <ul className="text-sm my-4 space-y-2">
              <li>
                <a>Expenses</a>
              </li>
              <li>
                <a>Accounts</a>
              </li>
              <li>
                <a>Help</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
            </ul>
          </nav>
          <div className="flex justify-between mt-32">
            <small>Savora</small>
            <span>Moon Icon for Theme</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;

/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import useTableStore from "../../store/table.store";
import SummaryBox from "./SummaryBox";
import WelcomeCard from "./WelcomeCard";
import TransctionHistory from "./TransactionsHistory";
import useAuthStore from "@/store/auth.store";
import UpcomingTransactions from "./UpcomingTransactions";
import TransactionBreakdown from "./TransactionsBreakdown";

function Dashboard() {
  const { getRows, expensesTotal } = useTableStore();
  const { session, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && session) {
      getRows();
    }
  }, [loading, session, getRows]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      <div className="hidden md:block">
        <Header />
      </div>

      <div className="flex-1 ">
        <WelcomeCard />
        <div className="relative z-10 -mt-60 flex justify-center">
          <SummaryBox income={0} expenses={expensesTotal} />
        </div>
        <UpcomingTransactions />

        <div className="md:flex md:w-full">
          <TransactionBreakdown></TransactionBreakdown>
          <TransctionHistory />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

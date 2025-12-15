/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import useTableStore from "../../store/table.store";
import SummaryBox from "./SummaryBox";
import WelcomeCard from "./WelcomeCard";
import TransctionHistory from "./TransactionHistory";
import useAuthStore from "@/store/auth.store";
import UpcomingTransactions from "./UpcomingTransactions";

function Dashboard() {
  const { getRows, expensesTotal } = useTableStore();
  const { session, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && session) {
      getRows();
    }
  }, [loading, session]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      <div className="hidden md:block">
        <Header />
      </div>

      <div className="flex-1 bg-gray-50">
        <WelcomeCard />
        <div className="relative z-10 -mt-60 flex justify-center">
          <SummaryBox balance={0} income={0} expenses={expensesTotal} />
        </div>
        <UpcomingTransactions />
        <TransctionHistory />
      </div>
    </div>
  );
}

export default Dashboard;

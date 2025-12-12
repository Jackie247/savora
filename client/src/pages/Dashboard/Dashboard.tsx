import { Bell } from "lucide-react";
import { useEffect } from "react";
import NetflixLogo from "../../assets/icons/netflix-logo.svg?react";
import SalaryLogo from "../../assets/icons/salary-logo.svg?react";
import SpotifyLogo from "../../assets/icons/spotify-logo.svg?react";
import Header from "../../components/Header";
import MobileHeader from "../../components/MobileHeader";
import useAuthStore from "../../store/auth.store";
import useTableStore from "../../store/table.store";
import SummaryBox from "./SummaryBox";
import TransactionRow from "./TransactionRow";

function Dashboard() {
  const { getRows, calculateAllExpenses, expensesTotal } = useTableStore();
  
  // if (session) {
  //   <>
  //     <div className="flex flex-col min-h-screen">
  //       <div className="block md:hidden">
  //         <MobileHeader />
  //       </div>
  //       <div className="hidden md:block">
  //         <Header />
  //       </div>
  //       <div className="flex-1 bg-gray-50">
  //         <section className="p-6 bg-secondary [clip-path:ellipse(120%_60%_at_50%_0%)]">
  //           <div className="flex flex-col">
  //             <span className="text-accent-text">Welcome back,</span>
  //             <div className="flex justify-between">
  //               <span className="text-2xl text-white">Jackie Yu</span>
  //               <button type="button" className="text-white">
  //                 <Bell />
  //               </button>
  //             </div>
  //           </div>
  //           <div className="h-60"></div>
  //         </section>
  //         <div className="relative z-10 -mt-60 flex justify-center">
  //           <SummaryBox
  //             header="Expenses"
  //             balance={0}
  //             income={0}
  //             expenses={expensesTotal}
  //           />
  //         </div>
  //         <section className="p-6 flex flex-col">
  //           <div className="flex justify-between">
  //             <h3>Transactions History</h3>
  //             <span className="text-xs self-center text-gray-500">See all</span>
  //           </div>

  //           <article>
  //             <TransactionRow
  //               title="Netflix"
  //               value="12.99"
  //               type="expense"
  //               date="Jan 30, 2025"
  //               icon={NetflixLogo}
  //             ></TransactionRow>
  //           </article>

  //           <article>
  //             <TransactionRow
  //               title="Salary"
  //               value="2149.43"
  //               type="income"
  //               date="March 28, 2025"
  //               icon={SalaryLogo}
  //             ></TransactionRow>
  //           </article>

  //           <article>
  //             <TransactionRow
  //               title="Spotify"
  //               value="4.00"
  //               type="expense"
  //               date="Jan 30, 2025"
  //               icon={SpotifyLogo}
  //             ></TransactionRow>
  //           </article>
  //         </section>
  //       </div>
  //     </div>
  //   </>;
  // }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="block md:hidden">
          <MobileHeader />
        </div>
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="flex-1 bg-gray-50">
          <section className="p-6 bg-secondary [clip-path:ellipse(120%_60%_at_50%_0%)]">
            <div className="flex flex-col">
              <span className="text-accent-text">Welcome back,</span>
              <div className="flex justify-between">
                <span className="text-2xl text-white">Jackie Yu</span>
                <button type="button" className="text-white">
                  <Bell />
                </button>
              </div>
            </div>
            <div className="h-60"></div>
          </section>
          <div className="relative z-10 -mt-60 flex justify-center">
            <SummaryBox
              header="Expenses"
              balance={0}
              income={0}
              expenses={expensesTotal}
            />
          </div>
          <section className="p-6 flex flex-col">
            <div className="flex justify-between">
              <h3>Transactions History</h3>
              <span className="text-xs self-center text-gray-500">See all</span>
            </div>

            <article>
              <TransactionRow
                title="Netflix"
                value="12.99"
                type="expense"
                date="Jan 30, 2025"
                icon={NetflixLogo}
              ></TransactionRow>
            </article>

            <article>
              <TransactionRow
                title="Salary"
                value="2149.43"
                type="income"
                date="March 28, 2025"
                icon={SalaryLogo}
              ></TransactionRow>
            </article>

            <article>
              <TransactionRow
                title="Spotify"
                value="4.00"
                type="expense"
                date="Jan 30, 2025"
                icon={SpotifyLogo}
              ></TransactionRow>
            </article>
          </section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

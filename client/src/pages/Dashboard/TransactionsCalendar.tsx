import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useTables } from "@/store/table.store";
import { useState } from "react";

interface upcomingTransactions {
  title: string;
  date: string;
  price: number;
}
export default function TransactionsCalendar() {
  const [viewMode, setViewMode] = useState("week");

  const expenses = useTables();

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const transactions = [
    ...expenses.fixedPayments,
    ...expenses.investments,
    ...expenses.credit,
  ];

  const transactionDates: upcomingTransactions[] = [];

  transactions.forEach((transaction) => {
    // each transaction has a recurring day of the month, if set to monthly
    // use this number to create the date using current month of the year
    if (transaction.recurring_day) {
      const transactionsDate = `${year}-${month + 1}-${
        transaction.recurring_day
      }`;
      transactionDates.push({
        title: transaction.name,
        date: transactionsDate,
        price: transaction.value,
      });
    }
  });

  console.log(transactionDates);

  // const date = `${year}-${month}-${today}`;

  return (
    <section className="p-10 hidden md:block lg:px-20 xl:px-60">
      <h2 className="text-xl font-bold">Upcoming Transactions</h2>
      <div className="flex flex-col my-4">
        {/* <span>Today is {formattedDate}</span>
        <span>
          You have {upcomingCount} upcoming transaction{pluralTransactions}{" "}
          {interval === "week" ? "this week" : "this month"}
        </span> */}
      </div>
      <div className=" bg-sidebar-primary rounded">
        <div className="md:p-4">
          <div className="">
            <button
              type="button"
              className={`p-2 font-medium rounded-t transition-all duration-200  ${
                viewMode === "week"
                  ? "bg-card text-foreground translate-y-0 z-10"
                  : "bg-muted/50 text-muted-foreground translate-y-1 hover:bg-muted/70"
              }`}
              onClick={() => {
                setViewMode("week");
              }}
            >
              Week
            </button>
            <button
              type="button"
              className={`p-2 font-medium rounded-t transition-all duration-200 ${
                viewMode === "month"
                  ? "bg-card text-foreground translate-y-0 z-10"
                  : "bg-muted/50 text-muted-foreground translate-y-1 hover:bg-muted/70"
              }`}
              onClick={() => {
                setViewMode("month");
              }}
            >
              Month
            </button>
          </div>

          {viewMode === "week" && (
            <div className="bg-card p-4 lg:p-10 rounded-tl-none">
              <div className="md:block lg:hidden">
                {/* Laptop */}
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridWeek"
                  weekends={true}
                  dayMaxEvents={true}
                  events={transactionDates}
                  height="auto"
                  contentHeight="auto"
                />
              </div>

              <div className="md:hidden lg:block">
                {/* Laptop */}
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridWeek"
                  weekends={true}
                  dayMaxEvents={true}
                  events={transactionDates}
                  height="auto"
                  contentHeight="auto"
                />
              </div>
            </div>
          )}
          {viewMode === "month" && (
            <div className="bg-card p-4 rounded-tl-none">
              <div className="md:block lg:hidden">
                {/* Tablet */}
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  dayMaxEvents={true}
                  events={transactionDates}
                  height={400}
                />
              </div>
              <div className="md:hidden lg:block">
                {/* Laptop */}
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  dayMaxEvents={true}
                  events={transactionDates}
                  height={500}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

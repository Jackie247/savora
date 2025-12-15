import useTableStore from "@/store/table.store";

const UpcomingTransactions = () => {
  const { tables } = useTableStore();

  const date = new Date();

  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  console.log(formattedDate);
  return (
    <section className="p-6 flex flex-col">
      <h2 className="text-xl">Upcoming</h2>
      <span>Today is {formattedDate}</span>
      <article></article>
    </section>
  );
};

export default UpcomingTransactions;

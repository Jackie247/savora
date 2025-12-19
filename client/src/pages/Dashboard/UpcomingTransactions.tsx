const UpcomingTransactions = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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

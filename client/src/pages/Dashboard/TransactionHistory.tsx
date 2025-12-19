import NetflixLogo from "../../assets/icons/netflix-logo.svg";
import SalaryLogo from "../../assets/icons/salary-logo.svg";
import SpotifyLogo from "../../assets/icons/spotify-logo.svg";
import TransactionRow from "./TransactionRow";

const TransctionHistory = () => {
  return (
    <section className="p-6 flex flex-col">
      <div className="flex justify-between">
        <h3>Transactions History</h3>
        <span className="text-xs self-center text-gray-500">
          <a href="/expenses">See all</a>
        </span>
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
  );
};

export default TransctionHistory;

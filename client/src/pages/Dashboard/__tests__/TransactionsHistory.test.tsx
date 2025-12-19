import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TransactionsHistory from "../TransactionsHistory";
import NetflixLogo from "../../../assets/icons/netflix-logo.svg";
import SpotifyLogo from "../../../assets/icons/spotify-logo.svg";
import { useTransactionsStore } from "../../../store/transactions.store";

describe("TransactionsHistory Component", () => {
  beforeEach(() => {
    // Reset / seed the store
    useTransactionsStore.setState({
      transactions: [
        {
          id: "1",
          title: "Netflix",
          value: "12.99",
          type: "expense",
          date: "Jan 30, 2025",
          icon: NetflixLogo,
        },
        {
          id: "2",
          title: "Spotify",
          value: "4.00",
          type: "expense",
          date: "Jan 30, 2025",
          icon: SpotifyLogo,
        },
      ],
    });
  });

  it("renders transaction rows correctly", () => {
    render(<TransactionsHistory />);
    // rendering more than one so use getAllByTestId
    const rows = screen.getAllByTestId("transaction-row");
    expect(rows).toHaveLength(2);
    expect(screen.getByText("Netflix")).toBeInTheDocument();
  });
});

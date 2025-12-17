import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import "@testing-library/jest-dom/vitest";

describe("Dashboard", () => {
  it("renders core sections", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("mobile-header")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("welcome-card")).toBeInTheDocument();
    expect(screen.getByTestId("summary-box")).toBeInTheDocument();
    expect(screen.getByTestId("upcoming-transactions")).toBeInTheDocument();
    expect(screen.getByTestId("transactions-breakdown")).toBeInTheDocument();
    expect(screen.getByTestId("transactions-history")).toBeInTheDocument();
  });
});

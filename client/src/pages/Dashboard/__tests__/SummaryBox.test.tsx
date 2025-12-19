import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SummaryBox from "../SummaryBox";

describe("SummaryBox Component", () => {
  it("renders balance, income and expenses values correctly", () => {
    render(<SummaryBox income={1234.5} expenses={99.99} />);
    const balanceValue = screen.getByTestId("balance-value");
    const incomeValue = screen.getByTestId("income-value");
    const expensesValue = screen.getByTestId("expenses-value");

    expect(balanceValue.textContent).toEqual("£1,134.51");
    expect(incomeValue.textContent).toEqual("£1,234.50");
    expect(expensesValue.textContent).toEqual("£99.99");
  });
});

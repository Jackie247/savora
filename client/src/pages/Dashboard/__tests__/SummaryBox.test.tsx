import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import SummaryBox from "../SummaryBox";

describe("SummaryBox Component", () => {
  it("renders balance, income and expenses values correctly", () => {
    render(<SummaryBox balance={0} income={0} expenses={0} />);
    const balanceValue = screen.getByTestId("balance-value");
    const incomeValue = screen.getByTestId("income-value");
    const expensesValue = screen.getByTestId("expenses-value");

    expect(balanceValue.textContent).toEqual("£0.00");
    expect(incomeValue.textContent).toEqual("£0.00");
    expect(expensesValue.textContent).toEqual("£0.00");
  });
});

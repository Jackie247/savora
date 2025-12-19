import DayOfMonthPicker from "../../components/DayOfMonthPicker";
// import DayOfWeekPicker from "../../components/DayOfWeekPicker";
import ModalField from "../../components/ModalField";
import useModalStore from "../../store/modal.store";
import useTableStore from "@/store/table.store";
// import { useState } from "react";
const EditRowModal = () => {
  const { modalValues, resetModal, closeModal, updateModalValue } =
    useModalStore();

  const { updateRow, getRows } = useTableStore();

  const intervalOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const weeklyOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const isRecurring = modalValues.is_recurring;
  const interval = modalValues.recurring_interval;
  // const weeklyDay = modalValues.recurring_day_of_week;

  const sanitizeValues = (values: typeof modalValues) => {
    const next = { ...values };

    // non-recurring
    if (!values.is_recurring) {
      next.recurring_day = null;
      next.recurring_day_of_week = null;
      next.recurring_interval = null;
      return next;
    }

    // recurring: interval required
    if (values.recurring_interval === "monthly") {
      next.expense_date = null;
      next.recurring_day_of_week = null;
      return next;
    }

    if (values.recurring_interval === "weekly") {
      next.expense_date = null;
      next.recurring_day = null;
      return next;
    }

    // daily or unknown
    next.recurring_interval = "daily";
    next.expense_date = null;
    next.recurring_day = null;
    next.recurring_day_of_week = null;
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedModalValues = sanitizeValues(modalValues);

    await updateRow(cleanedModalValues);
    closeModal();
    getRows();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-white shadow-lg p-6 w-full ">
        <div className="flex justify-between align-middle mb-4">
          <h2 className="text-lg font-semibold">Edit Row</h2>
          <button type="button" onClick={closeModal}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <ModalField
            type="select"
            label="Type of Expense"
            options={[
              { value: "fixedPayments", label: "Fixed Payments" },
              { value: "investments", label: "Investments" },
              { value: "credit", label: "Credit" },
            ]}
            field="expense_type"
            value={modalValues.expense_Type}
            updateModalValue={updateModalValue}
          />
          <ModalField
            label="Name"
            value={modalValues.name || ""}
            updateModalValue={updateModalValue}
            field="name"
          ></ModalField>
          <ModalField
            label="Value"
            value={modalValues.value || ""}
            updateModalValue={updateModalValue}
            field="value"
          ></ModalField>

          <div className="mb-4 flex justify-between">
            {isRecurring ? (
              <div className="mb-4">
                <label
                  htmlFor="recurring_interval-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recurring Interval
                </label>

                <select
                  id="recurring_interval-input"
                  value={modalValues.recurring_interval as string}
                  onChange={(e) => {
                    updateModalValue("recurring_interval", e.target.value);
                  }}
                  className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 max-h-8 overflow-y-auto"
                >
                  {intervalOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <ModalField
                label="Expense Date"
                value={modalValues.expense_date}
                updateModalValue={updateModalValue}
                field="expense_date"
                type="date"
              ></ModalField>
            )}
            <ModalField
              label="Recurring"
              value={modalValues.is_recurring || false}
              updateModalValue={updateModalValue}
              field="is_recurring"
              type="checkbox"
            ></ModalField>
          </div>

          {isRecurring && interval === "monthly" && (
            <DayOfMonthPicker
              recurringDay={modalValues.recurring_day}
              updateModalValue={updateModalValue}
            />
          )}
          {isRecurring && interval === "weekly" && (
            <div className="mb-4">
              <div className="flex justify-center">
                <label
                  htmlFor="day-week-picker"
                  className="text-sm font-medium text-gray-700"
                >
                  Day:
                </label>

                <select
                  id="day-week-picker"
                  value={modalValues.recurring_day_of_week as string}
                  onChange={(e) => {
                    updateModalValue("recurring_day_of_week", e.target.value);
                  }}
                  className="mt-1 p-1 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 max-h-8 overflow-y-auto"
                >
                  {weeklyOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Update
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={resetModal}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRowModal;

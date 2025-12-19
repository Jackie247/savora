import React from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { Pie } from "react-chartjs-2";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";

import { LabelLayout, UniversalTransition } from "echarts/features";

import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const TransactionsBreakdown: React.FC = () => {
  const pieData = {
    labels: ["Fixed Payments", "Investments", "Credit"],
    datasets: [
      {
        label: "Total Amount In GBP",
        data: [20, 10, 5],
        backgroundColor: [
          "oklch(0.646 0.222 41.116)",
          "oklch(0.6 0.118 184.704)",
          "oklch(0.398 0.07 227.392)",
        ],
        borderColor: [
          "oklch(0.646 0.222 41.116)",
          "oklch(0.6 0.118 184.704)",
          "oklch(0.398 0.07 227.392)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section
      data-testid="transactions-breakdown"
      className="bg-sidebar-primary p-4 flex justify-center md:bg-background md:mx-10 md:mr-4 md:shadow md:rounded-md"
    >
      <div className="bg-card rounded-md w-full flex justify-center md:bg-card">
        <div className="h-80 w-60 flex justify-center flex-col md:rounded-md md:w-full md:h-full">
          <h2 className="text-2xl text-center">Spending Breakdown</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </section>
  );
};

export default TransactionsBreakdown;

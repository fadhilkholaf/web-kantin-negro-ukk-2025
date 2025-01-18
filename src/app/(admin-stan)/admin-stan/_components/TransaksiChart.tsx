"use client";

import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";

import { rupiah } from "@/utils/utils";

const TransaksiChart = ({
  data,
}: {
  data: { month: string; total: number }[];
}) => {
  const options: AgChartOptions = {
    data: [...data] as {
      month: string;
      total: number;
    }[],
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "total",
      } as AgBarSeriesOptions,
    ],
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        label: { formatter: (p) => rupiah(p.value) },
      },
    ],
  };

  return (
    <div>
      <AgCharts options={options} />
    </div>
  );
};

export default TransaksiChart;

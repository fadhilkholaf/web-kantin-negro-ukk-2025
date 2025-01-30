"use client";

import { useRouter } from "next/navigation";

import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";

import { month, rupiah } from "@/utils/utils";

const TransaksiChart = ({
  data,
  tahun,
}: {
  data: { month: string; total: number }[];
  tahun: number;
}) => {
  const router = useRouter();

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
        listeners: {
          nodeClick: (event) => {
            router.push(
              `/admin-stan/pendapatan?bulan=${month.findIndex((v) => v === event.datum.month)}&tahun=${tahun}`,
            );
          },
        },
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

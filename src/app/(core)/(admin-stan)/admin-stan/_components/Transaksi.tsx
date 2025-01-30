"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { getTransaksiDataAction } from "@/action/transaksi";

import TransaksiChart from "./TransaksiChart";

const Transaksi = () => {
  const thisYear = new Date().getFullYear();

  const [tahun, setTahun] = useState<number>(thisYear);
  const [data, setData] = useState<
    {
      month: string;
      total: number;
    }[]
  >([]);

  useEffect(() => {
    const loading = toast.loading("Retrieving data...", { duration: 1000 });

    const response = async () => {
      const dataTransaksi = await getTransaksiDataAction(tahun);

      if (dataTransaksi.success && "data" in dataTransaksi) {
        setData(dataTransaksi.data);

        toast.success(dataTransaksi.message, { id: loading });
      } else {
        setData([]);

        toast.error(dataTransaksi.message, { id: loading });
      }
    };

    response();
  }, [tahun]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 font-mono text-primary">
        <label htmlFor="tahun" className="text-sm">
          Filter tahun <span className="text-red-500">*</span>
        </label>
        <select
          name="tahun"
          id="tahun"
          onChange={(e) => setTahun(Number(e.target.value))}
          className="rounded-full border border-primary px-2 py-1"
        >
          {Array.from({ length: 5 }, (_, i) => ({ index: i })).map((_, i) => (
            <option key={i} value={`${thisYear - i}`}>
              {thisYear - i}
            </option>
          ))}
        </select>
      </div>
      <TransaksiChart data={data} tahun={tahun} />
    </div>
  );
};

export default Transaksi;

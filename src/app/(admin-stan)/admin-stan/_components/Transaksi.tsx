"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { getTransaksiDataAction } from "@/action/transaksi";

import TransaksiChart from "./TransaksiChart";

const Transaksi = () => {
  const [tahun, setTahun] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<
    {
      month: string;
      total: number;
    }[]
  >([]);

  useEffect(() => {
    const loading = toast.loading("Retrieving data...");

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
    <div className="flex flex-col">
      <select
        name="tahun"
        id="tahun"
        onChange={(e) => setTahun(Number(e.target.value))}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select>
      <TransaksiChart data={data} />
    </div>
  );
};

export default Transaksi;

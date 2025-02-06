"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Prisma } from "@prisma/client";
import { toast } from "sonner";

import { getDetailPenghasilanAction } from "@/action/transaksi";
import { month, rupiah, wib } from "@/utils/utils";

const PendapatanPage = () => {
  const queryParams = useSearchParams();
  const [transaksi, setTransaksi] = useState<
    Prisma.TransaksiGetPayload<{
      include: { detailTransaksi: { include: { menu: true } }; siswa: true };
    }>[]
  >([]);

  const bulan = Number(queryParams.get("bulan"));
  const tahun = Number(queryParams.get("tahun"));

  if (!tahun || !month[bulan]) {
    redirect("/not-found");
  }

  useEffect(() => {
    const loading = toast.loading("Retrieving data...", { duration: 1000 });

    const getTransaksi = async () => {
      const dataTransaksi = await getDetailPenghasilanAction(bulan, tahun);

      if (dataTransaksi.success && "data" in dataTransaksi) {
        setTransaksi(dataTransaksi.data);

        toast.success(dataTransaksi.message, { id: loading });
      } else {
        setTransaksi([]);

        toast.error(dataTransaksi.message, { id: loading });
      }
    };

    getTransaksi();
  }, [bulan, tahun]);

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex flex-col text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Pendapatan
        </h1>
        <p className="flex flex-wrap items-center gap-4">
          Data pendapatan bulan {month[bulan]} tahun {tahun}
        </p>
      </header>
      <main>
        <ul className="grid grid-cols-1 gap-4 text-primary lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {transaksi.map((t, i) => (
            <li key={i} className="bg-white p-4">
              <ul className="flex h-full flex-col gap-2 border-4 border-double border-primary p-4">
                <li className="flex justify-between gap-2">
                  <p>Tanggal:</p>
                  <p>{wib(t.tanggal)}</p>
                </li>
                <li className="flex justify-between gap-2">
                  <p>Siswa:</p>
                  <p>{t.siswa?.namaSiswa ?? "-"}</p>
                </li>
                <hr />
                <ul className="h-full">
                  <li className="flex justify-between">
                    <p className="w-[33%]">Menu</p>
                    <p className="w-[33%] text-center">Qty</p>
                    <p className="w-[33%] text-end">Harga</p>
                  </li>
                  {t.detailTransaksi.map((dt, j) => (
                    <li key={j} className="flex justify-between">
                      <p className="w-[33%]">- {dt.menu?.namaMakanan ?? "-"}</p>
                      <p className="w-[33%] text-center">{dt.qty}</p>
                      <p className="w-[33%] text-end">{rupiah(dt.hargaBeli)}</p>
                    </li>
                  ))}
                </ul>
                <hr />
                <li className="flex justify-between gap-2">
                  <p>Total harga:</p>
                  <p>
                    {rupiah(
                      t.detailTransaksi.reduce(
                        (a, { hargaBeli }) => a + hargaBeli,
                        0,
                      ),
                    )}
                  </p>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p className="text-primary">
          Total pendapatan:{" "}
          {rupiah(
            transaksi.reduce(
              (a, b) =>
                a +
                b.detailTransaksi.reduce(
                  (c, { hargaBeli }) => c + hargaBeli,
                  0,
                ),
              0,
            ),
          )}
        </p>
      </footer>
    </main>
  );
};

export default PendapatanPage;

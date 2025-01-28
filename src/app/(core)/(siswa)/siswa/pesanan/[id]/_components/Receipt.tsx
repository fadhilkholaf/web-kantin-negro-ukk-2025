"use client";

import { useRef } from "react";

import { toJpeg } from "html-to-image";
import { Prisma } from "@prisma/client";
import { rupiah, wib } from "@/utils/utils";

const Receipt = ({
  t,
}: {
  t: Prisma.TransaksiGetPayload<{
    include: {
      siswa: true;
      stan: true;
      detailTransaksi: { include: { menu: true } };
    };
  }>;
}) => {
  const receiptRef = useRef(null!);

  const handlePrint = async () => {
    try {
      const dataUrl = await toJpeg(receiptRef.current, { quality: 0.5 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${t.id}.jpeg`;
      a.click();
      URL.revokeObjectURL(dataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex w-full overflow-auto font-mono">
        <main
          ref={receiptRef}
          className="flex h-fit w-[600px] flex-shrink-0 bg-white p-2 text-primary"
        >
          <div className="flex w-full flex-col gap-2 border-4 border-double border-primary p-2">
            <header className="flex items-end justify-between">
              <h1 className="font-italiana text-3xl font-bold tracking-wider">
                Kantin Negro
              </h1>
              <p>by Fadhil</p>
            </header>
            <hr />
            <main className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div>
                  <p>Siswa</p>
                  <p>Stan</p>
                  <p>Waktu</p>
                </div>
                <div>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div>
                  <p>{t.siswa?.namaSiswa ?? "-"}</p>
                  <p>{t.stan?.namaStan ?? "-"}</p>
                  <p>{wib(t.tanggal)}</p>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <p className="w-full">Menu</p>
                  <p className="w-[10%] flex-shrink-0">Jumlah</p>
                  <p className="w-full">Harga</p>
                  <p className="w-full">Total Harga</p>
                </div>
                {t.detailTransaksi.map((dt, i) => (
                  <div key={i} className="flex flex-row gap-2">
                    <p className="w-full">{dt.menu?.namaMakanan ?? "-"}</p>
                    <p className="w-[10%] flex-shrink-0">{dt.qty}</p>
                    <p className="w-full">
                      {dt.menu
                        ? dt.menu.harga * dt.qty === dt.hargaBeli
                          ? rupiah(dt.menu.harga)
                          : `${rupiah(dt.menu.harga)} - ${Math.round((1 - dt.hargaBeli / (dt.menu.harga * dt.qty)) * 100)}%`
                        : "-"}
                    </p>
                    <p className="w-full">{rupiah(dt.hargaBeli)}</p>
                  </div>
                ))}
                <hr />
                <div className="flex flex-row gap-2">
                  <p className="w-full"></p>
                  <p className="w-[10%] flex-shrink-0"></p>
                  <p className="w-full"></p>
                  <p className="w-full">
                    {rupiah(
                      t.detailTransaksi.reduce(
                        (a, { hargaBeli }) => a + hargaBeli,
                        0,
                      ),
                    )}
                  </p>
                </div>
              </div>
            </main>
            <hr />
            <footer>
              <p className="text-center">Terima Kasih</p>
            </footer>
          </div>
        </main>
      </div>
      <button
        type="button"
        onClick={async () => {
          await handlePrint();
        }}
        className="w-full rounded-full border border-primary bg-white px-2 py-1 font-italiana font-bold tracking-wider text-primary hover:bg-primary hover:text-white"
      >
        Print
      </button>
    </>
  );
};

export default Receipt;

import { redirect } from "next/navigation";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const PesananPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const transaksi = (await findManyTransaksi(
    {
      siswa: { userId: session.user.id },
    },
    { detailTransaksi: { include: { menu: true } } },
    { tanggal: "desc" },
  )) as Prisma.TransaksiGetPayload<{
    include: { detailTransaksi: { include: { menu: true } } };
  }>[];

  return (
    <main className="min-h-screen w-full">
      <ul className="flex flex-row gap-2 overflow-x-auto p-2">
        {transaksi &&
          transaksi.map((t, i) => (
            <li
              key={i}
              className="w-[1000px] flex-shrink-0 rounded-lg border p-2"
            >
              <>{t.id}</>
              <p>{t.status}</p>
              <Link href={`/siswa/pesanan/${t.id}`}>Print Receipt</Link>
              <ul className="">
                {t.detailTransaksi.map((dt, j) => (
                  <li key={j}>
                    <>{dt.id}</>
                    <p>{dt.qty}</p>
                    <p>{dt.hargaBeli}</p>
                    <p>{dt.menu?.namaMakanan ?? "Menu tidak tersedia!"}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default PesananPage;

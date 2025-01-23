import Link from "next/link";
import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { rupiah, wib } from "@/utils/utils";
import { cn } from "@/utils/cn";

const PesananPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
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
    <main className="min-h-screen w-full px-4 py-32 lg:px-8">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {transaksi &&
          transaksi.map((t, i) => (
            <li key={i} className="w-full flex-shrink-0 bg-white p-2">
              <div className="flex h-full flex-col gap-4 border-4 border-double border-primary p-2 text-primary">
                <header>
                  <p>{wib(t.tanggal)}</p>
                  <p
                    className={cn({
                      "text-red-500": t.status === "belumDikonfirmasi",
                      "text-yellow-500": t.status === "dimasak",
                      "text-blue-500": t.status === "diantar",
                    })}
                  >
                    {t.status === "belumDikonfirmasi"
                      ? "Belum Dikonfirmasi"
                      : t.status === "dimasak"
                        ? "Dimasak"
                        : t.status === "diantar"
                          ? "Diantar"
                          : "Sampai"}
                  </p>
                </header>
                <main className="h-full">
                  <ul className="flex flex-col gap-2">
                    {t.detailTransaksi.map((dt, j) => (
                      <li key={j} className="flex justify-between gap-2">
                        <p>{dt.menu?.namaMakanan ?? "-"}</p>
                        <p>{dt.qty}</p>
                        <p className="font-mono">{rupiah(dt.hargaBeli)}</p>
                      </li>
                    ))}
                  </ul>
                </main>
                <footer>
                  <Link
                    href={`/siswa/pesanan/${t.id}`}
                    className="block w-full rounded-full border border-primary px-2 py-1 text-center hover:bg-primary hover:text-white"
                  >
                    Print Receipt
                  </Link>
                </footer>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default PesananPage;

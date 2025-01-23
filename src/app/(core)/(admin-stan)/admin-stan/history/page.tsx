import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";

import HistoryTable from "./_components/HistoryTable";

const HistoryPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const transaksi = (await findManyTransaksi(
    {
      AND: [{ stan: { userId: session.user.id } }, { status: "sampai" }],
    },
    { detailTransaksi: true },
  )) as Prisma.TransaksiGetPayload<{
    include: { siswa: true; detailTransaksi: true };
  }>[];

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex flex-col text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          History
        </h1>
        <p>Data history pesanan</p>
      </header>
      <main>
        <HistoryTable transaksi={transaksi} />
      </main>
    </main>
  );
};

export default HistoryPage;

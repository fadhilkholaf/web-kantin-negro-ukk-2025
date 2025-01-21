import { redirect } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";

import HistoryTable from "./_components/HistoryTable";

const HistoryPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const transaksi = (await findManyTransaksi(
    {
      AND: [{ siswa: { userId: session.user.id } }],
    },
    { detailTransaksi: true },
  )) as Prisma.TransaksiGetPayload<{
    include: { siswa: true; detailTransaksi: true };
  }>[];

  return (
    <main className="flex min-h-screen w-full flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">History Transaksi</h1>
      </header>
      <main>
        <HistoryTable transaksi={transaksi} />
      </main>
    </main>
  );
};

export default HistoryPage;

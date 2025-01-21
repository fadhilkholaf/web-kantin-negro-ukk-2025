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
    <main className="min-h-screen w-full px-4 py-32 lg:px-8">
      <HistoryTable transaksi={transaksi} />
    </main>
  );
};

export default HistoryPage;

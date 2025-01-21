import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findTransaksi } from "@/database/transaksi";

import Receipt from "./_components/Receipt";

const ReceiptPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const t = (await findTransaksi(
    { id },
    { siswa: true, stan: true, detailTransaksi: { include: { menu: true } } },
  )) as Prisma.TransaksiGetPayload<{
    include: {
      siswa: true;
      stan: true;
      detailTransaksi: { include: { menu: true } };
    };
  }>;

  if (!t) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-32 lg:px-8">
      <Receipt t={t} />
    </main>
  );
};

export default ReceiptPage;

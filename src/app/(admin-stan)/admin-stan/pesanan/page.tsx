import { redirect } from "next/navigation";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { wib } from "@/utils/utils";
import { Prisma } from "@prisma/client";
import {
  DeleteTransaksiForm,
  UpdateStatusTransaksiForm,
} from "./_components/TransaksiForm";

const PesananPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const transaksi = (await findManyTransaksi(
    {
      AND: [
        { stan: { userId: session.user.id } },
        { NOT: [{ status: "sampai" }] },
      ],
    },
    { siswa: true, detailTransaksi: true },
  )) as Prisma.TransaksiGetPayload<{
    include: { siswa: true; detailTransaksi: true };
  }>[];

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pesanan</h1>
      </header>
      <main>
        <ul className="flex list-inside list-disc flex-col gap-4">
          {transaksi &&
            transaksi.map((t, i) => (
              <li key={i} className="flex flex-col gap-2">
                {wib(t.tanggal)}
                <p>Siswa: {t.siswa?.namaSiswa ?? "-"}</p>
                <p>Status: {t.status}</p>
                <div className="flex gap-2">
                  <UpdateStatusTransaksiForm
                    id={t.id}
                    label="Konfirmasi"
                    className="bg-green-200"
                    status={"dimasak"}
                  />
                  <UpdateStatusTransaksiForm
                    id={t.id}
                    label="Antar"
                    className="bg-green-200"
                    status={"diantar"}
                  />
                  <UpdateStatusTransaksiForm
                    id={t.id}
                    label="Sampai"
                    className="bg-green-200"
                    status={"sampai"}
                  />
                </div>
                <DeleteTransaksiForm id={t.id} />
              </li>
            ))}
        </ul>
      </main>
    </main>
  );
};

export default PesananPage;

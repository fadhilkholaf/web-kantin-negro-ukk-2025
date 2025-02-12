import { notFound } from "next/navigation";

import { findManyTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { wib } from "@/utils/utils";
import { Prisma } from "@prisma/client";
import {
  DeleteTransaksiForm,
  UpdateStatusTransaksiForm,
} from "./_components/TransaksiForm";
import { cn } from "@/utils/cn";

const PesananPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const transaksi = (await findManyTransaksi(
    {
      AND: [
        { stan: { userId: session.user.id } },
        { NOT: [{ status: "sampai" }] },
      ],
    },
    { siswa: true, detailTransaksi: { include: { menu: true } } },
    { tanggal: "asc" },
  )) as Prisma.TransaksiGetPayload<{
    include: { siswa: true; detailTransaksi: { include: { menu: true } } };
  }>[];

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex flex-col text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Pesanan
        </h1>
        <p>Data pesanan</p>
      </header>
      <main>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {transaksi &&
            transaksi.map((t, i) => (
              <li key={i} className="block bg-white p-4 font-mono text-primary">
                <div className="flex h-full flex-col gap-2 border-4 border-double border-primary p-4">
                  <header>
                    <p>{wib(t.tanggal)}</p>
                    <p>Siswa: {t.siswa?.namaSiswa ?? "-"}</p>
                    <p
                      className={cn({
                        "text-red-500": t.status === "belumDikonfirmasi",
                        "text-orange-500": t.status === "dimasak",
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
                    <ul>
                      {t.detailTransaksi.map((dt, i) => (
                        <li
                          key={i}
                        >{`- ${dt.menu?.namaMakanan}: ${dt.qty}`}</li>
                      ))}
                    </ul>
                  </main>
                  <footer className="flex flex-col gap-2">
                    <UpdateStatusTransaksiForm
                      id={t.id}
                      siswaId={t.siswaId ?? ""}
                      label={
                        t.status === "belumDikonfirmasi"
                          ? "Konfirmasi"
                          : t.status === "dimasak"
                            ? "Antar"
                            : "Sampai"
                      }
                      status={
                        t.status === "belumDikonfirmasi"
                          ? "dimasak"
                          : t.status === "dimasak"
                            ? "diantar"
                            : "sampai"
                      }
                    />
                    <DeleteTransaksiForm id={t.id} />
                  </footer>
                </div>
              </li>
            ))}
        </ul>
      </main>
    </main>
  );
};

export default PesananPage;

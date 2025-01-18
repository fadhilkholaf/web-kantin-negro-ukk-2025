import { findTransaksi } from "@/database/transaksi";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
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
    redirect("/");
  }

  return (
    <main className="flex min-h-screen w-full">
      <section className="w-full">
        <header>
          <p>Kantin Negro</p>
        </header>
        <main>
          <div className="flex flex-row gap-2">
            <div>
              <p>Stan</p>
              <p>Siswa</p>
            </div>
            <div>
              <p>:</p>
              <p>:</p>
            </div>
            <div>
              <p>{t.stan?.namaStan ?? "-"}</p>
              <p>{t.siswa?.namaSiswa ?? "-"}</p>
            </div>
          </div>
          <div>
            <ul>
              {t.detailTransaksi.map((dt, i) => (
                <li key={i}>- {dt.hargaBeli}</li>
              ))}
            </ul>
          </div>
        </main>
        <footer>
          <p>Terimakasih</p>
          <p>Silahkan berbelanja kembali</p>
        </footer>
      </section>
      <section className="w-full">
        <Receipt t={t} />
      </section>
    </main>
  );
};

export default ReceiptPage;

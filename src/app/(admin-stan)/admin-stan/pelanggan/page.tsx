import { findManyUsers } from "@/database/user";

import PelangganTable from "./_components/PelangganTable";
import { LinkButton } from "@/components/Button";

const PelangganPage = async () => {
  const pelanggan = await findManyUsers({ NOT: [{ role: "adminStan" }] });

  return (
    <main className="min-h-screen w-full">
      <header className="flex items-center justify-between py-8">
        <h1 className="text-3xl font-bold">Pelanggan</h1>
        <LinkButton href="/admin-stan/pelanggan/new" className="w-fit">
          Create pelanggan
        </LinkButton>
      </header>
      <PelangganTable pelanggan={pelanggan} />
    </main>
  );
};

export default PelangganPage;

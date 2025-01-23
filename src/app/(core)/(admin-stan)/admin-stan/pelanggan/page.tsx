import { findManyUsers } from "@/database/user";

import PelangganTable from "./_components/PelangganTable";
import { LinkButton } from "@/components/Button";

const PelangganPage = async () => {
  const pelanggan = await findManyUsers({ NOT: [{ role: "adminStan" }] });

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex items-center justify-between text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Pelanggan
        </h1>
        <LinkButton
          href="/admin-stan/pelanggan/new"
          className="w-fit hover:bg-primary hover:text-white"
        >
          Create
        </LinkButton>
      </header>
      <PelangganTable pelanggan={pelanggan} />
    </main>
  );
};

export default PelangganPage;

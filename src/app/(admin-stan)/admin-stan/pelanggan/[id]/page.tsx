import { findUser } from "@/database/user";

import PelangganForm from "./_components/PelangganForm";
import { Prisma } from "@prisma/client";

const PelangganFormPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const pelanggan = (await findUser(
    { id },
    { siswa: true },
  )) as Prisma.UserGetPayload<{ include: { siswa: true } }>;

  if (!pelanggan) {
    return (
      <main className="min-h-screen w-full bg-neutral/10 py-8">
        <PelangganForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-neutral/10 py-8">
      <PelangganForm pelanggan={pelanggan} />
    </main>
  );
};

export default PelangganFormPage;

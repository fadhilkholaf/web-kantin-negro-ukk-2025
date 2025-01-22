import Link from "next/link";
import { notFound } from "next/navigation";

import { findManyDiskon } from "@/database/diskon";
import { auth } from "@/lib/auth";
import DiskonTable from "./_components/DiskonTable";

const DiskonPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const diskon = await findManyDiskon({ stan: { userId: session.user.id } });

  return (
    <main className="min-h-screen w-full">
      <header className="flex items-center justify-between py-8">
        <h1 className="text-3xl font-bold">Diskon</h1>
        <Link href="/admin-stan/diskon/new" className="rounded-lg border p-2">
          Create diskon
        </Link>
      </header>
      <DiskonTable diskon={diskon} />
    </main>
  );
};

export default DiskonPage;

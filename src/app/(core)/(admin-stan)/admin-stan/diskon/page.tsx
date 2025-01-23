import { notFound } from "next/navigation";

import { findManyDiskon } from "@/database/diskon";
import { auth } from "@/lib/auth";
import DiskonTable from "./_components/DiskonTable";
import { LinkButton } from "@/components/Button";

const DiskonPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const diskon = await findManyDiskon({ stan: { userId: session.user.id } });

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex items-center justify-between text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Diskon
        </h1>
        <LinkButton
          href="/admin-stan/diskon/new"
          className="w-fit hover:bg-primary hover:text-white"
        >
          Create
        </LinkButton>
      </header>
      <main>
        <DiskonTable diskon={diskon} />
      </main>
    </main>
  );
};

export default DiskonPage;

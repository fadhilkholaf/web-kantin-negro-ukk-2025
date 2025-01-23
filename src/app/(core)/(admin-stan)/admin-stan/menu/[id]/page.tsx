import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findManyDiskon } from "@/database/diskon";
import { findMenu } from "@/database/menu";
import { auth } from "@/lib/auth";

import DiskonTable from "./_components/DiskonTable";
import MenuForm from "./_components/MenuForm";

const MenuFormPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    notFound();
  }

  if (id === "new") {
    return (
      <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
        <header className="text-primary">
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Create Menu
          </h1>
        </header>
        <MenuForm />
      </main>
    );
  }

  const menu = (await findMenu(
    { id },
    { menuDiskon: { include: { diskon: true } } },
  )) as Prisma.MenuGetPayload<{
    include: { menuDiskon: { include: { diskon: true } } };
  }>;

  if (!menu) {
    notFound();
  }

  const diskon = await findManyDiskon({ stan: { userId: session.user.id } });

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Update Menu
        </h1>
      </header>
      <main className="flex flex-col gap-8">
        <MenuForm menu={menu} />
        <DiskonTable diskon={diskon} menu={menu} />
      </main>
    </main>
  );
};

export default MenuFormPage;

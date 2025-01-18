import { redirect } from "next/navigation";

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
    redirect("/");
  }

  if (id === "new") {
    return (
      <main className="min-h-screen w-full py-8">
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
    redirect("/not-found");
  }

  const diskon = await findManyDiskon({ stan: { userId: session.user.id } });

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 py-8">
      <MenuForm menu={menu} />
      <DiskonTable diskon={diskon} menu={menu} />
    </main>
  );
};

export default MenuFormPage;

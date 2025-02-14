import { redirect } from "next/navigation";

import { Prisma } from "@prisma/client";

import { findManyMenus } from "@/database/menu";
import { auth } from "@/lib/auth";

import MenuList from "./_components/MenuList";

const MenuPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const menus = (await findManyMenus(
    {},
    {
      menuDiskon: {
        include: { diskon: true },
        where: {
          diskon: {
            AND: [
              { tanggalAwal: { lte: new Date() } },
              { tanggalAkhir: { gte: new Date() } },
            ],
          },
        },
      },
      stan: { include: { blockedUser: true } },
    },
  )) as Prisma.MenuGetPayload<{
    include: {
      menuDiskon: { include: { diskon: true } };
      stan: { include: { blockedUser: true } };
    };
  }>[];

  return (
    <main className="min-h-screen w-full px-4 pb-48 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
      <MenuList menus={menus} userId={session.user.id} />
    </main>
  );
};

export default MenuPage;

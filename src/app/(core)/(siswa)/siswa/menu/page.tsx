import { Prisma } from "@prisma/client";

import { findManyMenus } from "@/database/menu";

import MenuList from "./_components/MenuList";

const MenuPage = async () => {
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
      stan: true,
    },
  )) as Prisma.MenuGetPayload<{
    include: { menuDiskon: { include: { diskon: true } }; stan: true };
  }>[];

  return (
    <main className="min-h-screen w-full px-4 pb-48 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
      <MenuList menus={menus} />
    </main>
  );
};

export default MenuPage;

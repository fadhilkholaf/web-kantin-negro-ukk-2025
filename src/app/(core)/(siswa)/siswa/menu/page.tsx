import { Prisma } from "@prisma/client";

import { findManyMenus } from "@/database/menu";

import MenuList from "./_components/MenuList";

const MenuPage = async () => {
  const menuWithDiscount = (await findManyMenus(
    {},
    { menuDiskon: { include: { diskon: true } } },
  )) as Prisma.MenuGetPayload<{
    include: { menuDiskon: { include: { diskon: true } } };
  }>[];

  return (
    <main className="min-h-screen w-full">
      <MenuList menus={menuWithDiscount} />
    </main>
  );
};

export default MenuPage;

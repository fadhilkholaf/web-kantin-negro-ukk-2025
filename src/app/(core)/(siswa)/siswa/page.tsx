import { Prisma } from "@prisma/client";

import { findManyTopMenu, findMenu } from "@/database/menu";
import { wib } from "@/utils/utils";

import TopMenusList from "./_components/TopMenusList";

const SiswaPage = async () => {
  const topMenus = await findManyTopMenu();

  const menus = await Promise.all(
    topMenus.map(async (tm) => {
      if (tm.menuId) {
        const m = (await findMenu(
          { id: tm.menuId },
          { stan: true },
        )) as Prisma.MenuGetPayload<{ include: { stan: true } }>;
        return m !== null ? { ...m, qty: tm._sum.qty } : null;
      } else {
        return null;
      }
    }),
  );

  const filteredMenus = menus.filter((m) => m !== null).slice(0, 3);

  const today = new Date();
  const lastMonth = new Date();

  today.setUTCHours(16, 59, 59, 999);

  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setUTCHours(-7, 0, 0, 0);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-32 lg:px-8">
      <header className="flex h-1/3 flex-col items-center justify-center gap-4 p-4 text-center text-primary lg:p-8">
        <h1 className="font-italiana text-[12vw] lg:text-[8vw]">Top Seller</h1>
        <p className="font-sans tracking-wide">
          {`Periode ${wib(lastMonth).split(",")[0]} - ${wib(today).split(",")[0]}`}
        </p>
      </header>
      <TopMenusList menus={filteredMenus} />
    </main>
  );
};

export default SiswaPage;

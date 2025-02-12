import { notFound } from "next/navigation";

import { LinkButton } from "@/components/Button";
import { findManyMenus } from "@/database/menu";
import { auth } from "@/lib/auth";

import MenuTable from "./_components/MenuTable";

const MenuPage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const menus = await findManyMenus({ stan: { userId: session.user.id } });

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex items-center justify-between text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Menu
        </h1>
        <LinkButton
          href="/admin-stan/menu/new"
          className="w-fit hover:bg-primary hover:text-white"
        >
          Create
        </LinkButton>
      </header>
      <main>
        <MenuTable menus={menus} />
      </main>
    </main>
  );
};

export default MenuPage;

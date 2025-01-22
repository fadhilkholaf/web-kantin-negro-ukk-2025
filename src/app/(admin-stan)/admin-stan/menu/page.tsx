import Link from "next/link";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen w-full">
      <header className="flex items-center justify-between py-8">
        <h1 className="text-3xl font-bold">Menu</h1>
        <Link href="/admin-stan/menu/new" className="rounded-lg border p-2">
          Create menu
        </Link>
      </header>
      <MenuTable menus={menus} />
    </main>
  );
};

export default MenuPage;

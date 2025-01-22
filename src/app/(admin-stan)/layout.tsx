import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

import { findStan } from "@/database/stan";
import { auth } from "@/lib/auth";

import Sidebar from "./_components/Sidebar";

const AdminStanLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  if (session.user.role !== "adminStan") {
    notFound();
  }

  const existingStan = await findStan({ userId: session.user.id });

  if (!existingStan) {
    redirect("/profile");
  }

  return (
    <>
      <Sidebar />
      <main className="flex w-full justify-end">
        <main className="w-[calc(100%-300px)] bg-yellow-500/10 px-8">
          {children}
        </main>
      </main>
    </>
  );
};

export default AdminStanLayout;

import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { findStan } from "@/database/stan";
import { auth } from "@/lib/auth";

import Sidebar from "./_components/Sidebar";

const AdminStanLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "adminStan") {
    redirect("/");
  }

  const existingStan = await findStan({ userId: session.user.id });

  if (!existingStan) {
    redirect("/profile");
  }

  return (
    <>
      <Sidebar />
      <main className="flex w-full justify-end">
        <main className="w-[calc(100%-300px)] px-8">{children}</main>
      </main>
    </>
  );
};

export default AdminStanLayout;

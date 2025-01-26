import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

import { findStan } from "@/database/stan";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Stan",
};

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

  return <main className="bg-neutral/10">{children}</main>;
};

export default AdminStanLayout;

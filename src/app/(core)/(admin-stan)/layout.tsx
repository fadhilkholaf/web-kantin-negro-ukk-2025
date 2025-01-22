import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

import { findStan } from "@/database/stan";
import { auth } from "@/lib/auth";

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

  return <>{children}</>;
};

export default AdminStanLayout;

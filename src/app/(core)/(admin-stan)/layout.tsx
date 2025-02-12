import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

import { findStan } from "@/database/stan";
import { auth } from "@/lib/auth";

import NotificationWrapper from "@/components/wrapper/NotificationWrapper";

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

  return (
    <main>
      <NotificationWrapper userId={existingStan.id}>
        {children}
      </NotificationWrapper>
    </main>
  );
};

export default AdminStanLayout;

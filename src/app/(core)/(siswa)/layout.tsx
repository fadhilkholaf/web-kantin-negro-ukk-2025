import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";

import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  if (session.user.role !== "siswa") {
    notFound();
  }

  const existingSiswa = await findSiswa({ userId: session.user.id });

  if (!existingSiswa) {
    redirect("/profile");
  }

  return <main className="bg-neutral/10">{children}</main>;
};

export default layout;

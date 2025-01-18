import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "siswa") {
    redirect("/");
  }

  const existingSiswa = await findSiswa({ userId: session.user.id });

  if (!existingSiswa) {
    redirect("/profile");
  }

  return <>{children}</>;
};

export default layout;

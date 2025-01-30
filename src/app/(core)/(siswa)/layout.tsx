import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

import ToastWrapper from "./_components/ToastWrapper";

export const metadata: Metadata = {
  title: "Siswa",
};

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  if (session.user.role !== "siswa") {
    notFound();
  }

  const existingSiswa = (await findSiswa(
    { userId: session.user.id },
    { user: true },
  )) as Prisma.SiswaGetPayload<{ include: { user: true } }>;

  if (!existingSiswa) {
    redirect("/profile");
  }

  return (
    <main>
      <ToastWrapper user={existingSiswa.user}>{children}</ToastWrapper>
    </main>
  );
};

export default layout;

import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { auth } from "@/lib/auth";

import LenisWrapper from "./_wrapper/LenisWrapper";

import "./main.css";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect(`/${session.user.role === "siswa" ? "siswa" : "admin-stan"}`);
  }

  return (
    <>
      <LenisWrapper>{children}</LenisWrapper>
    </>
  );
};

export default MainLayout;

import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center bg-neutral/10">
        <section className="w-full max-w-[1536px]">{children}</section>
      </main>
    </>
  );
};

export default MainLayout;

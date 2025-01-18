import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="px-8 py-32">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

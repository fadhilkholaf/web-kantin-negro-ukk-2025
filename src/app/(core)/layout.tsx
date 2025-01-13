import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;

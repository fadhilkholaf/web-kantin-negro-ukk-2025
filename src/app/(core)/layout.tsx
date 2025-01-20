import { ReactNode } from "react";

import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;

import { ReactNode } from "react";

import LenisWrapper from "./_wrapper/LenisWrapper";

import "./main.css";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <LenisWrapper>{children}</LenisWrapper>
    </>
  );
};

export default MainLayout;

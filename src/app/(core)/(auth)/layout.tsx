import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;

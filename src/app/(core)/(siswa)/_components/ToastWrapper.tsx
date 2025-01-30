"use client";

import { ReactNode } from "react";

import { User } from "@prisma/client";
import { toast } from "sonner";

const ToastWrapper = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  if (!user.verified) {
    toast.error("Your password is unverified!", {
      description: "Change your password right now!",
      duration: 10000,
    });
  }

  return <>{children}</>;
};

export default ToastWrapper;

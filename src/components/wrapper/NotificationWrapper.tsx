"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { InboundMessage } from "ably";
import { toast } from "sonner";

import { useAbly } from "@/context/AblyContext";

const NotificationWrapper = ({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) => {
  const router = useRouter();
  const ably = useAbly();

  useEffect(() => {
    const channel = ably.channels.get("order");

    const handleOrder = async (e: InboundMessage) => {
      toast.info(e.data.message);
      router.refresh();
    };

    channel.subscribe(userId, handleOrder);

    return () => {
      channel.unsubscribe(userId, handleOrder);
    };
  });

  return <>{children}</>;
};

export default NotificationWrapper;

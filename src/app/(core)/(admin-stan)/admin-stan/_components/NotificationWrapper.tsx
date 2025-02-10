"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { InboundMessage } from "ably";
import { toast } from "sonner";

import { getClient } from "@/lib/ably";

const NotificationWrapper = ({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    const client = getClient();
    const channel = client.channels.get("order");

    const handleOrder = async (e: InboundMessage) => {
      toast.info("New order request!");
      router.refresh();
      console.log({ order: e.data.id });
    };

    channel.subscribe(userId, handleOrder);

    return () => {
      channel.unsubscribe(userId, handleOrder);
    };
  });

  return <>{children}</>;
};

export default NotificationWrapper;

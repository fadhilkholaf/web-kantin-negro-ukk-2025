"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Realtime } from "ably";

const AblyContext = createContext<Realtime | null>(null);

export const AblyProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Realtime | null>(null);

  useEffect(() => {
    const ablyClient = new Realtime({
      authUrl: "/api/ably",
    });
    setClient(ablyClient);
    return () => {
      ablyClient.close();
    };
  }, []);

  return <AblyContext.Provider value={client}>{children}</AblyContext.Provider>;
};

export const useAbly = () => {
  const context = useContext(AblyContext);
  if (context === null) {
    throw new Error("useAbly must be used within an AblyProvider");
  }
  return context;
};

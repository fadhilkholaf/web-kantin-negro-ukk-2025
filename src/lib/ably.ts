import Ably from "ably";

export const getClient = () => {
  return new Ably.Realtime({
    authUrl: "/api/ably",
  });
};

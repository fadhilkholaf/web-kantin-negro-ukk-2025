import { NextResponse } from "next/server";

import Ably from "ably";

export const revalidate = 0;

export const GET = async () => {
  const ably = new Ably.Rest(process.env.ABLY_API_KEY!);

  const tokenRequest = await ably.auth.createTokenRequest({
    clientId: "kantin-negro",
  });

  return NextResponse.json(tokenRequest);
};

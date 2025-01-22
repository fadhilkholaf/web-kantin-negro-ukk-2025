import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

// this route is
const authRoute = ["/signup", "/signin"];
const publicRoute = ["/"];

// start with this route is
const privateRoute = ["/siswa", "/admin-stan", "/profile"];

export default auth(async (req) => {
  const { auth, nextUrl, url } = req;
  const { pathname } = nextUrl;

  const isSignedIn = !!auth;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (publicRoute.includes(url)) {
    return NextResponse.next();
  }

  if (!isSignedIn) {
    if (pathname === "/signout") {
      return NextResponse.redirect(new URL("/not-found", url));
    }
    if (privateRoute.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/not-found", url));
    }
  }

  if (isSignedIn) {
    if (authRoute.includes(pathname)) {
      return NextResponse.redirect(new URL("/not-found", url));
    }
    if (auth.user.role === "siswa" && pathname.startsWith("/admin-stan")) {
      return NextResponse.redirect(new URL("/not-found", url));
    }
    if (auth.user.role === "adminStan" && pathname.startsWith("/siswa")) {
      return NextResponse.redirect(new URL("/not-found", url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

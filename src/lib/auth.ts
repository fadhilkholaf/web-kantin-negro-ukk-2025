import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { Role } from "@prisma/client";

import { findUser } from "@/database/user";
import { compareHash } from "@/utils/hash";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    role: Role;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { placeholder: "Username", required: true },
        password: { placeholder: "Password", required: true },
      },
      authorize: async (credentials) => {
        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await findUser({ username });

        if (!user) {
          return null;
        }

        const isCorrectPassword = compareHash(password, user.password);

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user && user.id) {
        const existingUser = await findUser({ id: user.id });
        if (existingUser) {
          token.id = existingUser.id;
          token.username = existingUser.username;
          token.role = existingUser.role;
        }
      }
      if (trigger === "update") {
        token.username = session.username;
        token.role = session.role;
      }
      return token;
    },
  },
  pages: {
    newUser: "/signup",
    signIn: "/signin",
    signOut: "/signout",
  },
});

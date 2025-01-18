"use client";

import Form from "next/form";

import { signOut } from "next-auth/react";
import { SubmitButton } from "@/components/Button";

const SignOutPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Form
        action={() => {
          signOut({ redirect: true, redirectTo: "/" });
        }}
        className="flex flex-col gap-4 rounded-lg border p-4"
      >
        <header>
          <h1 className="text-2xl font-bold">Sign Out Form</h1>
        </header>
        <main>
          <p>See you next time!</p>
        </main>
        <footer>
          <SubmitButton label="Sign out" />
        </footer>
      </Form>
    </main>
  );
};

export default SignOutPage;

"use client";

import Form from "next/form";

import { signOut } from "next-auth/react";
import { SubmitButton } from "@/components/Button";

const SignOutPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-neutral/10">
      <Form
        action={() => {
          signOut({ redirect: true, redirectTo: "/" });
        }}
        className="bg-white p-4"
      >
        <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
          <header className="text-primary">
            <h1 className="font-italiana text-3xl font-bold tracking-wider">
              Sign Out Form
            </h1>
            <p className="text-xs">See you next time!</p>
          </header>
          <footer className="flex flex-col gap-4 pt-2">
            <SubmitButton label="Sign out" />
          </footer>
        </div>
      </Form>
    </main>
  );
};

export default SignOutPage;

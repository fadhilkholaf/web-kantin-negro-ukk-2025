"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import { toast } from "sonner";

import { signInAction } from "@/action/auth";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg border p-2 text-center"
    >
      Sign In
    </button>
  );
};

const SignInPage = () => {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Form
        action={async (formData) => {
          const loading = toast.loading("Sign in...");

          const response = await signInAction(formData);

          if (response && !response.success) {
            toast.error(response.message, { id: loading });
          } else {
            toast.success("Sign in success!", { id: loading });

            router.push("/");
          }
        }}
        className="flex flex-col gap-4 rounded-lg border p-4"
      >
        <header>
          <h1 className="text-2xl font-bold">Sign In Form</h1>
        </header>
        <main className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="rounded-lg border p-2"
            />
          </div>
        </main>
        <footer>
          <SubmitButton />
        </footer>
      </Form>
    </main>
  );
};

export default SignInPage;

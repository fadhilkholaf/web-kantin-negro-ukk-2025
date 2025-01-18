"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { signInAction } from "@/action/auth";
import { SubmitButton } from "@/components/Button";

const SignInPage = () => {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Form
        action={async (formData) => {
          const loading = toast.loading("Sign in...");

          const response = await signInAction(formData);

          if (response.success) {
            toast.success("Sign in success!", { id: loading });

            router.push("/");
          } else {
            toast.error(response.message, { id: loading });
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
          <SubmitButton label="Sign in" />
        </footer>
      </Form>
    </main>
  );
};

export default SignInPage;

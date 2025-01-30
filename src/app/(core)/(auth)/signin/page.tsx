"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { signInAction } from "@/action/auth";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

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
        className="bg-white p-4"
      >
        <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
          <header className="text-primary">
            <h1 className="font-italiana text-3xl font-bold tracking-wider">
              Sign In Form
            </h1>
            <p className="text-xs">Welcome again!</p>
          </header>
          <main className="flex flex-col gap-2">
            <Input
              label="Username"
              required
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
            />
            <Input
              label="Password"
              required
              type="password"
              id="password"
              name="password"
              placeholder="Johndoe123"
            />
          </main>
          <footer className="flex flex-col gap-4 pt-2">
            <SubmitButton label="Submit" />
          </footer>
        </div>
      </Form>
    </main>
  );
};

export default SignInPage;

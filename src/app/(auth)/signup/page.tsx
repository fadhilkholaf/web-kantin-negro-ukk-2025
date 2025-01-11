"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useFormStatus } from "react-dom";

import { Role } from "@prisma/client";
import { toast } from "sonner";

import { signUpAction } from "@/action/auth";
import { cn } from "@/utils/cn";

const roles: { label: string; value: Role }[] = [
  { label: "Siswa", value: "siswa" },
  { label: "Admin Stan", value: "adminStan" },
];

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg border p-2 text-center"
    >
      Sign Up
    </button>
  );
};

const SignUpPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<Role>("siswa");

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Form
        action={async (formData) => {
          const loading = toast.loading("Creating user...");

          const response = await signUpAction(formData, role);

          if (response.success) {
            toast.success(response.message, { id: loading });

            router.push("/");
          } else {
            toast.error(response.message, { id: loading });
          }
        }}
        className="flex flex-col gap-4 rounded-lg border p-4"
      >
        <header>
          <h1 className="text-2xl font-bold">Sign Up Form</h1>
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
          <div className="flex flex-col">
            <label htmlFor="role">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {roles &&
                roles.map((r, i) => (
                  <Fragment key={i}>
                    <div className="w-full">
                      <label
                        htmlFor={r.value}
                        className={cn(
                          "block cursor-pointer rounded-lg border p-2 text-center",
                          {
                            "bg-gray-200": role === r.value,
                          },
                        )}
                      >
                        {r.label}
                      </label>
                      <input
                        type="radio"
                        name="role"
                        id={r.value}
                        value={r.value}
                        className="hidden"
                        onChange={() => setRole(r.value)}
                      />
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </main>
        <footer>
          <SubmitButton />
        </footer>
      </Form>
    </main>
  );
};

export default SignUpPage;

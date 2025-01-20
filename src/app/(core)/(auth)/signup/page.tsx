"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { Role } from "@prisma/client";
import { toast } from "sonner";

import { signUpAction } from "@/action/auth";
import { cn } from "@/utils/cn";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

const roles: { label: string; value: Role }[] = [
  { label: "Siswa", value: "siswa" },
  { label: "Admin Stan", value: "adminStan" },
];

const SignUpPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-neutral/10">
      <Form
        action={async (formData) => {
          const loading = toast.loading("Sign up...");

          const response = await signUpAction(formData);

          if (response.success) {
            toast.success(response.message, { id: loading });

            router.refresh();
          } else {
            setRole(null);

            toast.error(response.message, { id: loading });
          }
        }}
        className="bg-white p-4"
      >
        <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
          <header className="text-primary">
            <h1 className="font-italiana text-3xl font-bold tracking-wider">
              Sign Up Form
            </h1>
            <p className="text-xs">Get yourself ready!</p>
          </header>
          <main className="flex flex-col gap-2">
            <Input
              label="Username"
              required
              type="text"
              id="usernameU"
              name="usernameU"
            />
            <Input
              label="Password"
              required
              type="text"
              id="passwordU"
              name="passwordU"
            />
            <div className="flex flex-col font-mono text-primary">
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
                            "block cursor-pointer rounded-full border border-primary px-2 py-1 text-center",
                            {
                              "bg-primary text-white": role === r.value,
                            },
                          )}
                        >
                          {r.label}
                        </label>
                        <input
                          type="radio"
                          name="roleU"
                          id={r.value}
                          value={r.value}
                          className="hidden"
                          onClick={() => setRole(r.value)}
                        />
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </main>
          <footer className="flex flex-col gap-4 pt-2">
            <SubmitButton label="Submit" />
          </footer>
        </div>
      </Form>
    </main>
  );
};

export default SignUpPage;

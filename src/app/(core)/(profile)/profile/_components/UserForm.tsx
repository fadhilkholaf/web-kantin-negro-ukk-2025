"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { updateUserProfile } from "@/action/user";
import { Role, User } from "@prisma/client";
import { cn } from "@/utils/cn";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

const roles: { label: string; value: Role }[] = [
  { label: "Siswa", value: "siswa" },
  { label: "Admin Stan", value: "adminStan" },
];

const UserForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [role, setRole] = useState<Role>(user.role);

  const { update } = useSession();

  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading(`Update profile...`);

        const response = await updateUserProfile(formData);

        if (response.success && "updatedUser" in response) {
          await update({
            username: response.updatedUser.username,
            role: response.updatedUser.role,
          });

          toast.success(response.message, { id: loading });

          router.refresh();
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="bg-white p-4 text-primary"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Update User Profile
          </h1>
        </header>
        <main className="flex flex-col gap-2">
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            required={!user}
            defaultValue={user.username}
          />
          <Input
            label="Password"
            type="text"
            id="password"
            name="password"
            required={!user}
            defaultValue={user.password}
          />
          <div className="flex flex-col font-mono">
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
                        name="role"
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
        <footer className="pt-2">
          <SubmitButton label="Update profile" />
        </footer>
      </div>
    </Form>
  );
};

export default UserForm;

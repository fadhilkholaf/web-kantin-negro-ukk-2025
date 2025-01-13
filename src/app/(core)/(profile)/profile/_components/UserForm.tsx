"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useFormStatus } from "react-dom";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { updateUserProfile } from "@/action/user";
import { Role, User } from "@prisma/client";
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
      {`Update profile`}
    </button>
  );
};

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
      className="flex flex-col gap-4 rounded-lg border p-4"
    >
      <header>
        <h1 className="text-2xl font-bold">
          {user ? "Update" : "Create"} User Profile Form
        </h1>
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
            defaultValue={user.username}
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
            defaultValue={user.password}
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
  );
};

export default UserForm;

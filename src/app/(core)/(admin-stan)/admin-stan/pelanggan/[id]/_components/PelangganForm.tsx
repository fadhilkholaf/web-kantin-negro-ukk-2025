"use client";

import Form from "next/form";

import { Prisma } from "@prisma/client";
import { toast } from "sonner";

import { createPelangganAction, updatePelangganAction } from "@/action/user";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import PelangganProfileForm from "./PelangganProfileForm";

const PelangganForm = ({
  pelanggan,
}: {
  pelanggan?: Prisma.UserGetPayload<{ include: { siswa: true } }>;
}) => {
  const router = useRouter();

  return (
    <>
      {pelanggan && (
        <PelangganProfileForm
          siswa={pelanggan.siswa ?? undefined}
          userId={pelanggan.id}
        />
      )}
      <Form
        action={async (formData) => {
          const loading = toast.loading("Creating pelanggan...");

          let response;

          if (pelanggan) {
            formData.append("id", pelanggan.id);

            response = await updatePelangganAction(formData);
          } else {
            response = await createPelangganAction(formData);
          }

          if (response.success) {
            toast.success(response.message, { id: loading });

            if ("id" in response) {
              router.push(`/admin-stan/pelanggan/${response.id}`);
            }
          } else {
            toast.error(response.message, { id: loading });
          }
        }}
        className="bg-white p-4"
      >
        <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
          <header>
            <h1 className="font-italiana text-3xl font-bold tracking-wider text-primary">
              {pelanggan ? "Update" : "Create"} Pelanggan Form
            </h1>
          </header>
          <main className="flex flex-col gap-4">
            <Input
              label="Username"
              type="text"
              id="username"
              name="username"
              required={!pelanggan}
              defaultValue={pelanggan?.username}
              placeholder="John Doe"
            />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              required={!pelanggan}
              placeholder={
                pelanggan?.password ? "Enter new password" : "Johndoe123"
              }
            />
          </main>
          <footer className="pt-2">
            <SubmitButton label="Submit" />
          </footer>
        </div>
      </Form>
    </>
  );
};

export default PelangganForm;

"use client";

import Form from "next/form";

import { Stan } from "@prisma/client";
import { toast } from "sonner";

import { createStanProfile, updateStanProfile } from "@/action/stan";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

const AdminStanForm = ({ stan }: { stan?: Stan }) => {
  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading(
          `${stan ? "Updating" : "Creating"} profile...`,
        );

        let response;

        if (stan) {
          response = await updateStanProfile(formData);
        } else {
          response = await createStanProfile(formData);
        }

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="bg-white p-4 text-primary"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            {stan ? "Update" : "Create"} Stan Profile Form
          </h1>
        </header>
        <main className="flex flex-col gap-2">
          <Input
            label="Nama Stan"
            type="text"
            id="namaStan"
            name="namaStan"
            required={!stan}
            defaultValue={stan?.namaStan}
          />
          <Input
            label="Nama Pemilik"
            type="text"
            id="namaPemilik"
            name="namaPemilik"
            required={!stan}
            defaultValue={stan?.namaPemilik}
          />
          <Input
            label="Telp"
            type="text"
            id="telp"
            name="telp"
            required={!stan}
            defaultValue={stan?.telp}
          />
        </main>
        <footer className="pt-2">
          <SubmitButton label={`${stan ? "Update" : "Create"} profile`} />
        </footer>
      </div>
    </Form>
  );
};

export default AdminStanForm;

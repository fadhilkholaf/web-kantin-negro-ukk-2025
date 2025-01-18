"use client";

import Form from "next/form";

import { toast } from "sonner";

import { createStanProfile, updateStanProfile } from "@/action/stan";
import { Stan } from "@prisma/client";
import { SubmitButton } from "@/components/Button";

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
      className="flex flex-col gap-4 rounded-lg border p-4"
    >
      <header>
        <h1 className="text-2xl font-bold">
          {stan ? "Update" : "Create"} Stan Profile Form
        </h1>
      </header>
      <main className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="namaStan">
            Nama Stan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaStan"
            id="namaStan"
            defaultValue={stan?.namaStan}
            className="rounded-lg border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="namaPemilik">
            Nama Pemilik Stan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaPemilik"
            id="namaPemilik"
            defaultValue={stan?.namaPemilik}
            className="rounded-lg border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="telp">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="telp"
            id="telp"
            defaultValue={stan?.telp}
            className="rounded-lg border p-2"
          />
        </div>
      </main>
      <footer>
        <SubmitButton label={`${stan ? "Update" : "Create"} profile`} />
      </footer>
    </Form>
  );
};

export default AdminStanForm;

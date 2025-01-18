"use client";

import Form from "next/form";
import Image from "next/image";
import { useState } from "react";

import { toast } from "sonner";

import { createSiswaProfile, updateSiswaProfile } from "@/action/siswa";
import { Siswa } from "@prisma/client";
import { SubmitButton } from "@/components/Button";

const SiswaForm = ({ siswa }: { siswa?: Siswa }) => {
  const [imagePreview, setImagePreview] = useState<string>(
    siswa?.foto ?? "/images/dummy.jpg",
  );

  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading(
          `${siswa ? "Updating" : "Creating"} profile...`,
        );

        let response;

        if (siswa) {
          response = await updateSiswaProfile(formData);
        } else {
          response = await createSiswaProfile(formData);
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
          {siswa ? "Update" : "Create"} Siswa Profile Form
        </h1>
      </header>
      <main className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="namaSiswa">
            Nama Siswa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaSiswa"
            id="namaSiswa"
            defaultValue={siswa?.namaSiswa}
            className="rounded-lg border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="alamat">
            Alamat <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="alamat"
            id="alamat"
            defaultValue={siswa?.alamat}
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
            defaultValue={siswa?.telp}
            className="rounded-lg border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="foto">
            Foto <span className="text-red-500">*</span>
          </label>
          <Image
            src={imagePreview}
            alt="Profile Preview"
            width={500}
            height={500}
            className="aspect-square object-cover"
          />
          <input
            type="file"
            name="foto"
            id="foto"
            accept="image/*"
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files![0]))
            }
            className="rounded-lg border p-2"
          />
        </div>
      </main>
      <footer>
        <SubmitButton label={`${siswa ? "Update" : "Create"} profile`} />
      </footer>
    </Form>
  );
};

export default SiswaForm;

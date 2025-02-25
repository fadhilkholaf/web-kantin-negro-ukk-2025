"use client";

import Form from "next/form";
import Image from "next/image";
import { useState } from "react";

import { toast } from "sonner";

import {
  createPelangganProfileAction,
  updatePelangganProfileAction,
} from "@/action/pelanggan";
import { Siswa } from "@prisma/client";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

const PelangganProfileForm = ({
  siswa,
  userId,
}: {
  siswa?: Siswa;
  userId: string;
}) => {
  const [imagePreview, setImagePreview] = useState<string>(
    siswa?.foto ?? "/images/dummy5.png",
  );

  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading(
          `${siswa ? "Updating" : "Creating"} profile...`,
        );

        let response;

        if (siswa) {
          response = await updatePelangganProfileAction(formData, userId);
        } else {
          response = await createPelangganProfileAction(formData, userId);
        }

        if (response.success) {
          URL.revokeObjectURL(imagePreview);

          toast.success(response.message, { id: loading });
        } else {
          URL.revokeObjectURL(imagePreview);

          setImagePreview(siswa?.foto ?? "/images/dummy5.png");

          toast.error(response.message, { id: loading });
        }
      }}
      className="bg-white p-4 text-primary"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            {siswa ? "Update" : "Create"} Pelanggan Profile
          </h1>
        </header>
        <main className="flex flex-col items-center gap-8 md:flex-row">
          <Image
            src={imagePreview}
            alt="Profile Preview"
            width={250}
            height={250}
            className="aspect-square h-[250px] w-[250px] rounded-full object-cover"
          />
          <div className="flex w-full flex-col gap-2">
            <Input
              label="Nama siswa"
              type="text"
              id="namaSiswa"
              name="namaSiswa"
              required={!siswa}
              defaultValue={siswa?.namaSiswa}
            />
            <Input
              label="Alamat"
              type="text"
              id="alamat"
              name="alamat"
              required={!siswa}
              defaultValue={siswa?.alamat}
            />
            <Input
              label="Telp"
              type="text"
              id="telp"
              name="telp"
              required={!siswa}
              defaultValue={siswa?.telp}
            />
            <Input
              label="Foto"
              type="file"
              id="foto"
              name="foto"
              required={!siswa}
              accept="image/*"
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files![0]))
              }
            />
          </div>
        </main>
        <footer className="pt-2">
          <SubmitButton label={`${siswa ? "Update" : "Create"} profile`} />
        </footer>
      </div>
    </Form>
  );
};

export default PelangganProfileForm;

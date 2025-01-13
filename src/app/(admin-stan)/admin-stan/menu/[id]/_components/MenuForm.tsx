"use client";

import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useFormStatus } from "react-dom";

import { Jenis, Menu } from "@prisma/client";
import { toast } from "sonner";

import { createMenuAction, updateMenuAction } from "@/action/menu";
import { cn } from "@/utils/cn";

const jenises: { label: string; value: Jenis }[] = [
  { label: "Makanan", value: "makanan" },
  { label: "Minuman", value: "minuman" },
];

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg border p-2 text-center"
    >
      {text}
    </button>
  );
};

const MenuForm = ({ menu }: { menu?: Menu }) => {
  const router = useRouter();
  const [jenis, setJenis] = useState<Jenis | null>(menu ? menu.jenis : null);
  const [imagePreview, setImagePreview] = useState<string>(
    menu?.foto ?? "/dummy.jpg",
  );

  return (
    <>
      <Form
        action={async (formData) => {
          const loading = toast.loading(
            `${menu ? "Updating" : "Creating"} menu...`,
          );

          let response;

          if (menu) {
            response = await updateMenuAction(formData, menu.id);
          } else {
            response = await createMenuAction(formData);
          }

          if (response.success) {
            toast.success(response.message, { id: loading });

            router.push("/admin-stan/menu");
          } else {
            setJenis(null);
            setImagePreview("/dummy.jpg");

            toast.error(response.message, { id: loading });
          }
        }}
        className="flex flex-col gap-4 rounded-lg border p-4"
      >
        <header>
          <h1 className="text-2xl font-bold">
            {menu ? "Update" : "Create"} Menu Form
          </h1>
        </header>
        <main className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="namaMakanan">
              Nama Makanan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaMakanan"
              id="namaMakanan"
              defaultValue={menu?.namaMakanan}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="deskripsi">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="deskripsi"
              id="deskripsi"
              defaultValue={menu?.deskripsi}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="harga">
              Harga <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              defaultValue={menu?.harga}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="jenis">
              Jenis <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {jenises &&
                jenises.map((j, i) => (
                  <Fragment key={i}>
                    <div className="w-full">
                      <label
                        htmlFor={j.value}
                        className={cn(
                          "block cursor-pointer rounded-lg border p-2 text-center",
                          {
                            "bg-gray-200": jenis === j.value,
                          },
                        )}
                      >
                        {j.label}
                      </label>
                      <input
                        type="radio"
                        name="jenis"
                        id={j.value}
                        value={j.value}
                        className="hidden"
                        onChange={() => setJenis(j.value)}
                      />
                    </div>
                  </Fragment>
                ))}
            </div>
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
              priority
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
          <SubmitButton text={`${menu ? "Update" : "Create"} menu`} />
        </footer>
      </Form>
    </>
  );
};

export default MenuForm;

"use client";

import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { Jenis, Menu } from "@prisma/client";
import { toast } from "sonner";

import { createMenuAction, updateMenuAction } from "@/action/menu";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";

const jenises: { label: string; value: Jenis }[] = [
  { label: "Makanan", value: "makanan" },
  { label: "Minuman", value: "minuman" },
];

const MenuForm = ({ menu }: { menu?: Menu }) => {
  const router = useRouter();
  const [jenis, setJenis] = useState<Jenis | null>(menu ? menu.jenis : null);
  const [imagePreview, setImagePreview] = useState<string>(
    menu?.foto ?? "/images/dummy.jpg",
  );

  const action = async (formData: FormData) => {
    const loading = toast.loading(`${menu ? "Updating" : "Creating"} menu...`);

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
      setImagePreview("/images/dummy.jpg");

      toast.error(response.message, { id: loading });
    }
  };

  return (
    <section className="flex flex-row-reverse gap-4">
      <section className="w-1/3">
        <Image
          src={imagePreview}
          alt="Profile Preview"
          width={500}
          height={500}
          priority
          className="aspect-square w-full rounded-lg object-cover"
        />
      </section>
      <section className="w-2/3">
        <Form action={action} className="flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold">
              {menu ? "Update" : "Create"} Menu Form
            </h1>
          </header>
          <main className="flex flex-col gap-2">
            <Input
              label="Nama Makanan"
              type="text"
              id="namaMakanan"
              name="namaMakanan"
              defaultValue={menu?.namaMakanan}
            />
            <Input
              label="Deskripsi"
              type="text"
              id="deskripsi"
              name="deskripsi"
              defaultValue={menu?.deskripsi}
            />
            <Input
              label="Harga"
              type="number"
              id="harga"
              name="harga"
              defaultValue={menu?.harga}
            />
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
            <SubmitButton label={`${menu ? "Update" : "Create"} menu`} />
          </footer>
        </Form>
      </section>
    </section>
  );
};

export default MenuForm;

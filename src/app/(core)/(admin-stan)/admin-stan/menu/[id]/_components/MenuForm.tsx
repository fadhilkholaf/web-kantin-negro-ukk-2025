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
    menu?.foto ?? "/images/dummy5.png",
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
      setImagePreview("/images/dummy5.png");

      toast.error(response.message, { id: loading });
    }
  };

  return (
    <main className="bg-white p-4">
      <section className="flex flex-col gap-4 border-4 border-double border-primary p-4 lg:flex-row-reverse">
        <section className="flex justify-center lg:w-1/3">
          <Image
            src={imagePreview}
            alt="Profile Preview"
            width={500}
            height={500}
            priority
            className="aspect-square object-cover"
          />
        </section>
        <section className="lg:w-2/3">
          <Form action={action} className="flex flex-col gap-4">
            <header>
              <h1 className="font-italiana text-2xl font-bold tracking-wider text-primary">
                {menu ? "Update" : "Create"} Menu
              </h1>
            </header>
            <main className="flex flex-col gap-2">
              <Input
                label="Nama Makanan"
                type="text"
                id="namaMakanan"
                name="namaMakanan"
                required={!menu}
                defaultValue={menu?.namaMakanan}
              />
              <Input
                label="Deskripsi"
                type="text"
                id="deskripsi"
                name="deskripsi"
                required={!menu}
                defaultValue={menu?.deskripsi}
              />
              <Input
                label="Harga"
                type="number"
                id="harga"
                name="harga"
                required={!menu}
                defaultValue={menu?.harga}
              />
              <div className="flex flex-col font-mono text-primary">
                <label htmlFor="role">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {jenises &&
                    jenises.map((r, i) => (
                      <Fragment key={i}>
                        <div className="w-full">
                          <label
                            htmlFor={r.value}
                            className={cn(
                              "block cursor-pointer rounded-full border border-primary px-2 py-1 text-center",
                              {
                                "bg-primary text-white": jenis === r.value,
                              },
                            )}
                          >
                            {r.label}
                          </label>
                          <input
                            type="radio"
                            name="jenis"
                            id={r.value}
                            value={r.value}
                            className="hidden"
                            onClick={() => setJenis(r.value)}
                          />
                        </div>
                      </Fragment>
                    ))}
                </div>
              </div>
              <Input
                label="foto"
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                required={!menu}
                onChange={(e) =>
                  setImagePreview(URL.createObjectURL(e.target.files![0]))
                }
              />
            </main>
            <footer>
              <SubmitButton label={`${menu ? "Update" : "Create"} menu`} />
            </footer>
          </Form>
        </section>
      </section>
    </main>
  );
};

export default MenuForm;

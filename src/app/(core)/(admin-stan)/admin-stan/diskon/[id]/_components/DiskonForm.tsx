"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { Diskon } from "@prisma/client";
import { toast } from "sonner";

import { createDiskonAction, updateDiskonAction } from "@/action/diskon";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";

const DiskonForm = ({ diskon }: { diskon?: Diskon }) => {
  const router = useRouter();

  return (
    <div className="bg-white p-4">
      <Form
        action={async (formData) => {
          const loading = toast.loading(
            `${diskon ? "Updating" : "Creating"} diskon...`,
          );

          let response;

          if (diskon) {
            response = await updateDiskonAction(formData, diskon.id);
          } else {
            response = await createDiskonAction(formData);
          }

          if (response.success) {
            toast.success(response.message, { id: loading });

            router.push("/admin-stan/diskon");
          } else {
            toast.error(response.message, { id: loading });
          }
        }}
        className="flex flex-col gap-4 border-4 border-double border-primary p-4"
      >
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider text-primary">
            {diskon ? "Update" : "Create"} Diskon
          </h1>
        </header>
        <main className="flex flex-col gap-2">
          <Input
            label="Nama Diskon"
            type="text"
            id="namaDiskon"
            name="namaDiskon"
            required={!diskon}
            defaultValue={diskon?.namaDiskon}
          />
          <Input
            label="Peresentase Diskon"
            type="number"
            id="presentaseDiskon"
            name="presentaseDiskon"
            required={!diskon}
            defaultValue={diskon?.presentaseDiskon}
          />
          <Input
            label="Tanggal Awal"
            type="date"
            id="tanggalAwal"
            name="tanggalAwal"
            required={!diskon}
            defaultValue={diskon?.tanggalAwal?.toISOString().split("T")[0]}
          />
          <Input
            label="Tanggal Akhir"
            type="date"
            id="tanggalAkhir"
            name="tanggalAkhir"
            required={!diskon}
            defaultValue={diskon?.tanggalAkhir?.toISOString().split("T")[0]}
          />
        </main>
        <footer className="pt-2">
          <SubmitButton label={`${diskon ? "Update" : "Create"} diskon`} />
        </footer>
      </Form>
    </div>
  );
};

export default DiskonForm;

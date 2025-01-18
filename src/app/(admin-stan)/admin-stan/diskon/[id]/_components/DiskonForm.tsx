"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { Diskon } from "@prisma/client";
import { toast } from "sonner";

import { createDiskonAction, updateDiskonAction } from "@/action/diskon";
import { SubmitButton } from "@/components/Button";

const DiskonForm = ({ diskon }: { diskon?: Diskon }) => {
  const router = useRouter();

  return (
    <>
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
        className="flex flex-col gap-4 rounded-lg border p-4"
      >
        <header>
          <h1 className="text-2xl font-bold">
            {diskon ? "Update" : "Create"} Diskon Form
          </h1>
        </header>
        <main className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="namaDiskon">
              Nama Diskon <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="namaDiskon"
              id="namaDiskon"
              defaultValue={diskon?.namaDiskon}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="presentaseDiskon">
              Persentase Diskon <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="presentaseDiskon"
              id="presentaseDiskon"
              defaultValue={diskon?.presentaseDiskon}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tanggalAwal">
              Tanggal Awal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalAwal"
              id="tanggalAwal"
              defaultValue={diskon?.tanggalAwal?.toISOString().split("T")[0]}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tanggalAkhir">
              Tanggal Akhir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalAkhir"
              id="tanggalAkhir"
              defaultValue={diskon?.tanggalAkhir?.toISOString().split("T")[0]}
              className="rounded-lg border p-2"
            />
          </div>
        </main>
        <footer>
          <SubmitButton label={`${diskon ? "Update" : "Create"} diskon`} />
        </footer>
      </Form>
    </>
  );
};

export default DiskonForm;

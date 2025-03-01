"use client";

import Form from "next/form";

import { Status } from "@prisma/client";
import { toast } from "sonner";

import {
  deleteTransaksiAction,
  updateStatusTransaksiAction,
} from "@/action/transaksi";
import { SubmitButton } from "@/components/Button";
import { useAbly } from "@/context/AblyContext";

export const DeleteTransaksiForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Deleting diskon...");

        const response = await deleteTransaksiAction(id);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
    >
      <SubmitButton
        label="Delete"
        className="border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
      />
    </Form>
  );
};

export const UpdateStatusTransaksiForm = ({
  id,
  siswaId,
  label,
  status,
}: {
  id: string;
  siswaId: string;
  label: string;
  status: Status;
}) => {
  const ably = useAbly();
  const channel = ably.channels.get("order");

  return (
    <Form
      action={async () => {
        const loading = toast.loading("Updating status transaksi...");

        const response = await updateStatusTransaksiAction(id, status);

        if (response.success) {
          channel.publish(siswaId, {
            message: `Pesananmu ${
              status === "dimasak"
                ? "sedang dimasak"
                : status === "diantar"
                  ? "sedang diantar"
                  : "telah sampai"
            }!`,
          });

          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="w-full"
    >
      <SubmitButton
        label={label}
        className="border-primary bg-white text-primary hover:bg-primary hover:text-white"
      />
    </Form>
  );
};

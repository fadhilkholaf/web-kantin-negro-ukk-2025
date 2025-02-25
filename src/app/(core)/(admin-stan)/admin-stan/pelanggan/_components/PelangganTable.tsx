"use client";

import Form from "next/form";
import Image from "next/image";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { useSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

import {
  blockPelangganAction,
  unblocPelangganAction,
} from "@/action/pelanggan";
import { LinkButton, SubmitButton } from "@/components/Button";
import { defaultColDef } from "@/utils/constant";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

const BlockUserForm = ({
  userId,
  stanId,
}: {
  userId: string;
  stanId: string;
}) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Blocking user...");

        const response = await blockPelangganAction(userId, stanId);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
    >
      <SubmitButton
        label="Block"
        className="border-none text-red-500 hover:bg-transparent hover:text-red-500"
      />
    </Form>
  );
};

const UnblockUserForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Blocking user...");

        const response = await unblocPelangganAction(id);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
    >
      <SubmitButton
        label="Unblock"
        className="border-none hover:bg-transparent hover:text-primary"
      />
    </Form>
  );
};

const PelangganTable = ({
  pelanggan,
}: {
  pelanggan: Prisma.UserGetPayload<{
    include: { blockedStan: { include: { stan: true } }; siswa: true };
  }>[];
}) => {
  const { data: session } = useSession();

  const colDefs: ColDef<
    Prisma.UserGetPayload<{
      include: { blockedStan: { include: { stan: true } }; siswa: true };
    }>
  >[] = [
    {
      field: "username",
    },
    {
      headerName: "Nama Siswa",
      field: "siswa.namaSiswa",
    },
    {
      headerName: "Foto Siswa",
      field: "siswa.foto",
      cellRenderer: (p: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center justify-center p-2">
          <Image
            src={p.value ?? "/images/dummy5.png"}
            alt="Image Preview"
            width={80}
            height={80}
            className="aspect-square rounded-lg border object-cover"
          />
        </div>
      ),
    },
    {
      headerName: "Telp Siswa",
      field: "siswa.telp",
    },
    {
      field: "id",
      headerName: "Action",
      filter: false,
      sortable: false,
      resizable: false,
      minWidth: 150,
      cellRenderer: (
        p: CustomCellRendererProps<
          Prisma.UserGetPayload<{
            include: { blockedStan: { include: { stan: true } } };
          }>
        >,
      ) => {
        const blockedUser = p.data?.blockedStan.find(
          (bs) => bs.stan.userId === session?.user.id,
        );

        return (
          <div className="flex h-full w-full items-center justify-center gap-4">
            <LinkButton
              href={`/admin-stan/pelanggan/${p.value}`}
              className="w-fit border-none text-yellow-500"
            >
              Edit
            </LinkButton>
            {blockedUser ? (
              <UnblockUserForm id={blockedUser.id} />
            ) : (
              <BlockUserForm userId={p.value} stanId={session?.user.id ?? ""} />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="ag-theme-quartz h-[500px]">
      <AgGridReact
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 20]}
        rowData={pelanggan}
        rowHeight={100}
      />
    </div>
  );
};

export default PelangganTable;

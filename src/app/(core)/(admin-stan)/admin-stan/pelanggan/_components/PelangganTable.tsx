"use client";

import Form from "next/form";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { User } from "@prisma/client";
import { toast } from "sonner";

import { deleteUserAction } from "@/action/user";
import { LinkButton, SubmitButton } from "@/components/Button";
import { defaultColDef } from "@/utils/constant";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

const DeleteUserForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Deleting user...");

        const response = await deleteUserAction(id);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
    >
      <SubmitButton label="Delete" className="border-none" />
    </Form>
  );
};

const PelangganTable = ({ pelanggan }: { pelanggan: User[] }) => {
  const colDefs: ColDef<User>[] = [
    {
      field: "username",
    },
    {
      field: "password",
    },
    {
      field: "role",
    },
    {
      field: "id",
      headerName: "Action",
      filter: false,
      sortable: false,
      resizable: false,
      minWidth: 150,
      cellRenderer: (p: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center justify-center gap-4">
          <LinkButton
            href={`/admin-stan/pelanggan/${p.value}`}
            className="w-fit border-none"
          >
            Edit
          </LinkButton>
          <DeleteUserForm id={p.value} />
        </div>
      ),
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
      />
    </div>
  );
};

export default PelangganTable;

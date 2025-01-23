"use client";

import Form from "next/form";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { Diskon } from "@prisma/client";
import { toast } from "sonner";

import { deleteDiskonAction } from "@/action/diskon";
import { defaultColDef } from "@/utils/constant";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { wib } from "@/utils/utils";
import { LinkButton, SubmitButton } from "@/components/Button";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

const DeleteDiskonForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Deleting diskon...");

        const response = await deleteDiskonAction(id);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
    >
      <SubmitButton
        label="Delete"
        className="border-none bg-transparent text-red-500 hover:bg-transparent hover:text-red-500"
      />
    </Form>
  );
};

const DiskonTable = ({ diskon }: { diskon: Diskon[] }) => {
  const colDefs: ColDef<Diskon>[] = [
    {
      field: "namaDiskon",
      headerName: "Nama Diskon",
    },
    {
      field: "presentaseDiskon",
      headerName: "Persentase Diskon",
      cellRenderer: (p: CustomCellRendererProps) => <>{p.value}%</>,
    },
    {
      field: "tanggalAwal",
      headerName: "Tanggal Awal",
      valueFormatter: (p) => wib(p.value),
    },
    {
      field: "tanggalAkhir",
      headerName: "Tanggal Akhir",
      sortable: true,
      sort: "asc",
      valueFormatter: (p) => wib(p.value),
    },
    {
      field: "id",
      headerName: "Action",
      filter: false,
      sortable: false,
      resizable: false,
      minWidth: 150,
      cellRenderer: (p: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center justify-center gap-2 p-2">
          <LinkButton
            href={`/admin-stan/diskon/${p.value}`}
            className="block w-fit border-none bg-transparent text-yellow-500 hover:bg-transparent hover:text-yellow-500"
          >
            Edit
          </LinkButton>
          <DeleteDiskonForm id={p.value} />
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
        rowData={diskon}
      />
    </div>
  );
};

export default DiskonTable;

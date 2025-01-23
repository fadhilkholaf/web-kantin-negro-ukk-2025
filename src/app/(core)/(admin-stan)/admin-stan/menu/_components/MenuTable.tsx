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
import { Menu } from "@prisma/client";
import { toast } from "sonner";

import { deleteMenuAction } from "@/action/menu";
import { LinkButton, SubmitButton } from "@/components/Button";
import { defaultColDef } from "@/utils/constant";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

const DeleteMenuForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Deleting menu...");

        const response = await deleteMenuAction(id);

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

const MenuTable = ({ menus }: { menus: Menu[] }) => {
  const colDefs: ColDef<Menu>[] = [
    {
      field: "namaMakanan",
      headerName: "Nama Makanan",
      sortable: true,
      sort: "asc",
    },
    { field: "deskripsi" },
    {
      field: "harga",
      valueFormatter: (p) =>
        Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(p.value),
    },
    { field: "jenis" },
    {
      field: "foto",
      filter: false,
      sortable: false,
      cellRenderer: (p: CustomCellRendererProps) => (
        <div className="flex h-full w-full items-center justify-center p-2">
          <Image
            src={p.value}
            alt="Image Preview"
            width={80}
            height={80}
            className="aspect-square rounded-lg border object-cover"
          />
        </div>
      ),
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
            href={`/admin-stan/menu/${p.value}`}
            className="block w-fit border-none bg-transparent text-yellow-500 hover:bg-transparent hover:text-yellow-500"
          >
            Edit
          </LinkButton>
          <DeleteMenuForm id={p.value} />
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
        rowData={menus}
        rowHeight={100}
      />
    </div>
  );
};

export default MenuTable;

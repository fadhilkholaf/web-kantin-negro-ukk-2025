"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { Diskon, Prisma } from "@prisma/client";
import { toast } from "sonner";

import { checkMenuDiskonAction, deleteDiskonAction } from "@/action/diskon";
import { LinkButton, SubmitButton } from "@/components/Button";
import { defaultColDef } from "@/utils/constant";
import { wib } from "@/utils/utils";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { cn } from "@/utils/cn";

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

const DiskonTable = ({
  diskon,
  menu,
}: {
  diskon: Diskon[];
  menu: Prisma.MenuGetPayload<{ include: { menuDiskon: true } }>[];
}) => {
  const router = useRouter();

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
      headerName: "Menu",
      filter: false,
      sortable: false,
      minWidth: 200,
      cellRenderer: (p: CustomCellRendererProps) => (
        <select
          name={`${p.value}`}
          id={`${p.value}`}
          className="w-full rounded-full border border-primary p-2"
          onChange={async (e) => {
            const loading = toast.loading("Loading...");

            const response = await checkMenuDiskonAction(
              e.target.value,
              e.target.name,
            );

            if (response.success) {
              toast.success(response.message, { id: loading });
            } else {
              toast.error(response.message, { id: loading });
            }

            router.refresh();
          }}
        >
          <option value="">Atur diskon</option>
          {menu
            .sort((a) => {
              const thisDiskon = a.menuDiskon.find(
                (md) => md.diskonId === p.value,
              );

              if (thisDiskon) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((m, i) => {
              const isApplied = m.menuDiskon.some(
                (md) => md.diskonId === p.value,
              );
              return (
                <option
                  key={i}
                  value={m.id}
                  className={cn("text-black", {
                    "text-red-500": isApplied,
                  })}
                >{`${isApplied ? "lepas" : "pakai"} diskon untuk ${m.namaMakanan}`}</option>
              );
            })}
        </select>
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
        rowHeight={44}
        paginationPageSizeSelector={[5, 10, 20]}
        rowData={diskon}
      />
    </div>
  );
};

export default DiskonTable;

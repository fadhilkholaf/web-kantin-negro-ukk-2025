"use client";

import Form from "next/form";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { Diskon, Prisma } from "@prisma/client";
import { toast } from "sonner";

import { applyDiskonAction, removeDiskonAction } from "@/action/diskon";
import { SubmitButton } from "@/components/Button";
import { defaultColDef } from "@/utils/constant";
import { wib } from "@/utils/utils";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

interface RowDataInterface extends Diskon {
  menuDiskonId?: string;
}

const ApplyDiskonForm = ({
  menuId,
  diskonId,
}: {
  menuId: string;
  diskonId: string;
}) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Applying diskon...");

        const response = await applyDiskonAction(menuId, diskonId);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="w-full"
    >
      <SubmitButton
        label="Terapkan"
        className="rounded-none bg-white text-primary"
      />
    </Form>
  );
};

const RemoveDiskonForm = ({ id }: { id: string }) => {
  return (
    <Form
      action={async () => {
        const loading = toast.loading("Remove diskon...");

        const response = await removeDiskonAction(id);

        if (response.success) {
          toast.success(response.message, { id: loading });
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="w-full"
    >
      <SubmitButton
        label="Hapus"
        className="rounded-none bg-red-500 text-white"
      />
    </Form>
  );
};

const DiskonTable = ({
  diskon,
  menu,
}: {
  diskon: Diskon[];
  menu: Prisma.MenuGetPayload<{ include: { menuDiskon: true } }>;
}) => {
  const rowData: RowDataInterface[] = diskon.map((d) => {
    const menuDiskon = menu.menuDiskon.find((ad) => ad.diskonId === d.id);
    return {
      ...d,
      menuDiskonId: menuDiskon?.id ?? undefined,
    };
  });

  const colDefs: ColDef<RowDataInterface>[] = [
    {
      field: "namaDiskon",
      headerName: "Nama Diskon",
    },
    {
      field: "presentaseDiskon",
      headerName: "Persentase Diskon",
      valueFormatter: (p) => `${p.value}%`,
    },
    {
      field: "tanggalAwal",
      headerName: "Tanggal Awal",
      minWidth: 200,
      valueFormatter: (p) => wib(p.value),
    },
    {
      field: "tanggalAkhir",
      headerName: "Tanggal Akhir",
      sortable: true,
      sort: "desc",
      minWidth: 200,
      valueFormatter: (p) => wib(p.value),
    },
    {
      field: "menuDiskonId",
      headerName: "Terpakai",
      valueFormatter: (p) =>
        `${p.data?.menuDiskonId ? "Terpakai" : "Tidak Terpakai"}`,
    },
    {
      field: "id",
      headerName: "Action",
      filter: false,
      sortable: false,
      resizable: false,
      minWidth: 150,
      cellRenderer: (p: CustomCellRendererProps<RowDataInterface>) => (
        <div className="flex h-full w-full items-center justify-center gap-2 p-2">
          {p.data && p.data.menuDiskonId ? (
            <RemoveDiskonForm id={p.data.menuDiskonId} />
          ) : (
            <ApplyDiskonForm diskonId={p.value} menuId={menu.id} />
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold">List Diskon</h1>
      </header>
      <div className="ag-theme-quartz h-[500px]">
        <AgGridReact
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20]}
          rowData={rowData}
        />
      </div>
    </section>
  );
};

export default DiskonTable;

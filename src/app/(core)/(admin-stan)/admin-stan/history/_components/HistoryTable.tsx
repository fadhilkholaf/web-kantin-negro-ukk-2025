"use client";

import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Prisma } from "@prisma/client";

import { defaultColDef } from "@/utils/constant";
import { rupiah, wib } from "@/utils/utils";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({ theme: "legacy" });

const HistoryTable = ({
  transaksi,
}: {
  transaksi: Prisma.TransaksiGetPayload<{
    include: { detailTransaksi: true };
  }>[];
}) => {
  const colDefs: ColDef<
    Prisma.TransaksiGetPayload<{
      include: { detailTransaksi: true };
    }>
  >[] = [
    {
      field: "tanggal",
      headerName: "Tanggal Transaksi",
      valueFormatter: (p) => wib(p.value),
    },
    {
      headerName: "Total Pendapatan",
      filter: "agNumberColumnFilter",
      resizable: false,
      valueGetter: (p) =>
        p.data
          ? p.data.detailTransaksi.reduce(
              (hargaTotal, { hargaBeli }) => hargaTotal + hargaBeli,
              0,
            )
          : 0,
      valueFormatter: (p) => rupiah(p.value),
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
        rowData={transaksi}
      />
    </div>
  );
};

export default HistoryTable;

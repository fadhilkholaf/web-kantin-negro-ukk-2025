"use server";

import { revalidatePath } from "next/cache";

import { Prisma, Status } from "@prisma/client";

import {
  deleteTransaksi,
  findManyTransaksi,
  findTransaksi,
  updateTransaksi,
} from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { month } from "@/utils/utils";

export const getTransaksiDataAction = async (tahun: number) => {
  const session = await auth();

  if (!session) {
    return responseError("Unauthenticated!");
  }

  const transaksi = (await findManyTransaksi(
    {
      AND: [
        {
          stan: { userId: session.user.id },
        },
        {
          tanggal: { gte: new Date(`${tahun}`), lt: new Date(`${tahun + 1}`) },
        },
        { status: "sampai" },
      ],
    },
    { detailTransaksi: true },
  )) as Prisma.TransaksiGetPayload<{ include: { detailTransaksi: true } }>[];

  const chartData: { month: string; total: number }[] = Array.from(
    { length: 12 },
    (_, i) => ({ month: month[i], total: 0 }),
  );

  transaksi.map((t) => {
    const d = new Date(t.tanggal).getMonth();
    chartData[d].total += t.detailTransaksi.reduce(
      (a, b) => a + b.hargaBeli,
      0,
    );
  });

  return {
    ...responseSuccess("Success retrieving data!"),
    data: [...chartData],
  };
};

export const deleteTransaksiAction = async (id: string) => {
  try {
    const existingTransaksi = await findTransaksi({ id });

    if (!existingTransaksi) {
      return responseError("Can't found transaksi!");
    }

    await deleteTransaksi({ id });

    revalidatePath("/", "layout");
    return responseSuccess("Success deleting transaksi");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const updateStatusTransaksiAction = async (
  id: string,
  status: Status,
) => {
  try {
    const existingTransaksi = await findTransaksi({ id });

    if (!existingTransaksi) {
      return responseError("Can't found transaksi!");
    }

    await updateTransaksi({ id }, { status });

    revalidatePath("/", "layout");
    return responseSuccess("Success updating transaksi");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

"use server";

import { revalidatePath } from "next/cache";

import { Prisma, Status } from "@prisma/client";

import { CartMenu } from "@/app/(core)/(siswa)/siswa/menu/_components/MenuList";
import { findDiskon } from "@/database/diskon";
import { findMenu } from "@/database/menu";
import {
  deleteTransaksi,
  findManyTransaksi,
  findTransaksi,
  updateTransaksi,
} from "@/database/transaksi";
import { createTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { month } from "@/utils/utils";

export const createPesananAction = async (
  cart: {
    stanId: string;
    menu: CartMenu[];
  }[],
) => {
  try {
    if (!cart.length) {
      return responseError("Empty cart!");
    }

    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    await Promise.all(
      cart.map(async (c) => {
        await createTransaksi({
          siswa: { connect: { userId: session.user.id } },
          stan: { connect: { id: c.stanId } },
          detailTransaksi: {
            createMany: {
              data: (
                await Promise.all(
                  c.menu.map(async (m) => {
                    const existingMenu = await findMenu({ id: m.id });

                    if (existingMenu) {
                      if (m.diskonId) {
                        const existingDiskon = await findDiskon({
                          id: m.diskonId,
                        });

                        if (existingDiskon) {
                          return {
                            hargaBeli:
                              existingMenu.harga *
                              m.qty *
                              (1 - existingDiskon.presentaseDiskon / 100),
                            qty: m.qty,
                            menuId: m.id,
                          };
                        } else {
                          return {
                            hargaBeli: existingMenu.harga * m.qty,
                            qty: m.qty,
                            menuId: m.id,
                          };
                        }
                      } else {
                        return {
                          hargaBeli: existingMenu.harga * m.qty,
                          qty: m.qty,
                          menuId: m.id,
                        };
                      }
                    } else {
                      return null;
                    }
                  }),
                )
              ).filter((c) => c !== null),
            },
          },
        });
      }),
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success creating transaksi!");
  } catch (error) {
    console.log(error);

    return responseError("Somthing went wrong!");
  }
};

export const getTransaksiDataAction = async (tahun: number) => {
  try {
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
            tanggal: {
              gte: new Date(`${tahun}`),
              lt: new Date(`${tahun + 1}`),
            },
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
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const getDetailPenghasilanAction = async (
  bulan: number,
  tahun: number,
) => {
  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    const start = new Date();
    start.setFullYear(tahun);
    start.setMonth(bulan, 1);
    start.setHours(7, 0, 0, 0);

    const end = new Date();
    end.setFullYear(tahun);
    end.setMonth(bulan + 1, 1);
    end.setHours(7, 0, 0, 0);

    const transaksi = (await findManyTransaksi(
      {
        AND: [
          { stan: { userId: session.user.id } },
          { tanggal: { gte: start, lt: end } },
          { status: "sampai" },
        ],
      },
      { detailTransaksi: { include: { menu: true } }, siswa: true },
      { tanggal: "desc" },
    )) as Prisma.TransaksiGetPayload<{
      include: { detailTransaksi: { include: { menu: true } }; siswa: true };
    }>[];

    return {
      ...responseSuccess("Success retrieving data!"),
      data: [...transaksi],
    };
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
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

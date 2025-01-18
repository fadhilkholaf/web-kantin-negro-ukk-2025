"use server";

import { findDiskon } from "@/database/diskon";
import { findMenu } from "@/database/menu";
import { createTransaksi } from "@/database/transaksi";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { revalidatePath } from "next/cache";

export const createPesanan = async (
  cart: {
    stanId: string;
    menu: { menuId: string; diskonId?: string; qty: number }[];
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
                    const existingMenu = await findMenu({ id: m.menuId });

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
                            menuId: m.menuId,
                          };
                        } else {
                          return {
                            hargaBeli: existingMenu.harga * m.qty,
                            qty: m.qty,
                            menuId: m.menuId,
                          };
                        }
                      } else {
                        return {
                          hargaBeli: existingMenu.harga * m.qty,
                          qty: m.qty,
                          menuId: m.menuId,
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

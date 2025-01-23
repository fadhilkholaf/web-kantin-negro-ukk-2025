"use client";

import Form from "next/form";
import Image from "next/image";
import { useState } from "react";

import { Menu, Prisma } from "@prisma/client";
import { toast } from "sonner";

import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { createPesanan } from "@/action/pemesanan";
import { cn } from "@/utils/cn";
import { rupiah } from "@/utils/utils";

export interface CartMenu extends Menu {
  diskonId?: string;
  qty: number;
}

const MenuList = ({
  menus,
}: {
  menus: Prisma.MenuGetPayload<{
    include: { menuDiskon: { include: { diskon: true } }; stan: true };
  }>[];
}) => {
  const [cart, setCart] = useState<
    {
      stanId: string;
      menu: CartMenu[];
    }[]
  >([]);
  const [filterMenu, setFilterMenu] = useState<string>("");

  const handleAddQuantity = (stanId: string, menu: Menu) => {
    const existingStan = cart.find((c) => c.stanId === stanId);

    if (existingStan) {
      const newCart = cart.map((c) => {
        const existingMenu = c.menu.find((m) => m.id === menu.id);

        if (existingMenu) {
          const newMenu = c.menu.map((m) => {
            const thisMenu = m.id === menu.id;

            if (thisMenu) {
              return {
                ...m,
                qty: m.qty + 1,
              };
            } else {
              return m;
            }
          });

          return {
            ...c,
            menu: newMenu,
          };
        } else {
          if (c.stanId === stanId) {
            return { ...c, menu: [...c.menu, { ...menu, qty: 1 }] };
          } else {
            return c;
          }
        }
      });

      setCart(newCart);
    } else {
      setCart((prev) => [...prev, { stanId, menu: [{ ...menu, qty: 1 }] }]);
    }
  };

  const handleSubtractQuantity = (stanId: string, id: string) => {
    const existingStan = cart.find((c) => c.stanId === stanId);

    if (existingStan) {
      const newCart = cart
        .map((c) => {
          const existingMenu = c.menu.find((m) => m.id === id);

          if (existingMenu) {
            const newMenu = c.menu
              .map((m) => {
                const thisMenu = m.id === id;

                if (thisMenu) {
                  if (m.qty === 1) {
                    return null;
                  } else {
                    return {
                      ...m,
                      qty: m.qty - 1,
                    };
                  }
                } else {
                  return m;
                }
              })
              .filter((m) => m !== null);

            return {
              ...c,
              menu: newMenu,
            };
          } else {
            return c;
          }
        })
        .filter((c) => c.menu.length);

      setCart(newCart);
    }
  };

  const handleDiskon = (id: string, diskonId: string) => {
    const newCart = cart.map((c) => {
      const newMenu = c.menu.map((m) => {
        const thisMenu = m.id === id;

        if (thisMenu) {
          return {
            ...m,
            diskonId,
          };
        } else {
          return m;
        }
      });

      return {
        ...c,
        menu: newMenu,
      };
    });

    setCart(newCart);
  };

  return (
    <main className="flex flex-col gap-4 text-primary">
      <header className="fixed bottom-0 left-0 mb-20 w-full bg-white px-4 sm:mb-8 sm:w-fit lg:px-8">
        <Input
          label="Search"
          id="search"
          name="search"
          required
          onChange={(e) => {
            setFilterMenu(e.target.value);
          }}
        />
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {menus &&
          menus
            .filter((m) => m.namaMakanan.includes(filterMenu))
            .map((menu, i) => {
              const diskon = menu.menuDiskon.find(
                (m) =>
                  m.diskonId ===
                  cart
                    .find((c) => c.stanId === menu.stanId)
                    ?.menu.find((m) => m.id === menu.id)?.diskonId,
              )?.diskon.presentaseDiskon;

              const qty = cart
                .find((c) => c.stanId === menu.stanId)
                ?.menu.find((m) => m.id === menu.id)?.qty;

              const harga = diskon
                ? menu.harga * (1 - diskon / 100)
                : undefined;

              const { menuDiskon, ...destructedMenu } = menu;

              return (
                <li key={i} className="bg-white p-2">
                  <div className="flex h-full flex-col gap-2 border-4 border-double border-primary p-2 capitalize">
                    <header>
                      <Image
                        src={menu.foto}
                        alt="Menu Image"
                        width={500}
                        height={500}
                        priority
                        className="aspect-square w-full object-cover"
                      />
                    </header>
                    <main className="flex h-full flex-col gap-2">
                      <div>
                        <p>{menu.namaMakanan}</p>
                        <p className="text-xs text-secondary">
                          {menu.deskripsi}
                        </p>
                      </div>
                      <p>{menu.stan.namaStan}</p>
                      <p className="flex flex-wrap gap-2 font-mono">
                        <span className={cn({ "line-through": harga })}>
                          {rupiah(menu.harga)}
                        </span>
                        {harga && <span>{rupiah(harga)}</span>}
                      </p>
                      <p className="text-xs text-red-500">
                        Diskon untuk minimal 1 pembelian
                      </p>
                      <select
                        onChange={(e) => handleDiskon(menu.id, e.target.value)}
                        className="w-full rounded-full border border-primary px-2 py-1"
                      >
                        <option>Tanpa diskon</option>
                        {menuDiskon.map((d, j) => (
                          <option key={j} value={d.diskonId} disabled={!qty}>
                            {d.diskon.namaDiskon}
                          </option>
                        ))}
                      </select>
                    </main>
                    <footer className="flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleSubtractQuantity(menu.stanId, menu.id)
                        }
                        className="block h-[34px] w-[34px] flex-shrink-0 rounded-full border border-primary text-center hover:bg-primary hover:text-white"
                      >
                        -
                      </button>
                      <p className="w-full rounded-full border border-primary px-2 py-1 text-center">
                        {qty ?? 0}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleAddQuantity(menu.stanId, destructedMenu)
                        }
                        className="block h-[34px] w-[34px] flex-shrink-0 rounded-full border border-primary text-center hover:bg-primary hover:text-white"
                      >
                        +
                      </button>
                    </footer>
                  </div>
                </li>
              );
            })}
      </ul>
      <footer className="fixed bottom-0 right-0 mb-8 mr-4 flex lg:mr-8">
        <div className="flex flex-row-reverse">
          {cart &&
            cart.map((c, i) =>
              c.menu.map((m, j) => (
                <div key={`${i}/${j}`}>
                  <Image
                    src={m.foto}
                    alt="Cart Menu Image"
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] rounded-full border border-primary"
                  />
                </div>
              )),
            )}
        </div>
        <Form
          action={async () => {
            const loading = toast.loading("Creating transaksi...");

            const response = await createPesanan(cart);

            if (response.success) {
              toast.success(response.message, { id: loading });

              setFilterMenu("");
              setCart([]);
            } else {
              toast.error(response.message, { id: loading });
            }
          }}
        >
          <SubmitButton label="Create transaksi" className="bg-white" />
        </Form>
      </footer>
    </main>
  );
};

export default MenuList;

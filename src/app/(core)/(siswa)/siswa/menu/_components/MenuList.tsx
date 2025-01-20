"use client";

import Form from "next/form";
import Image from "next/image";
import { useState } from "react";

import { Prisma } from "@prisma/client";

import { createPesanan } from "@/action/pemesanan";
import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";
import { toast } from "sonner";
import { SubmitButton } from "@/components/Button";
import { rupiah } from "@/utils/utils";

const MenuList = ({
  menus,
}: {
  menus: Prisma.MenuGetPayload<{
    include: { menuDiskon: { include: { diskon: true } } };
  }>[];
}) => {
  const [cart, setCart] = useState<
    {
      stanId: string;
      menu: { menuId: string; diskonId?: string; qty: number }[];
    }[]
  >([]);
  const [filterMenu, setFilterMenu] = useState<string>("");

  const handleAddQuantity = (stanId: string, menuId: string) => {
    const existingStan = cart.find((c) => c.stanId === stanId);

    if (existingStan) {
      const newCart = cart.map((c) => {
        const existingMenu = c.menu.find((m) => m.menuId === menuId);

        if (existingMenu) {
          const newMenu = c.menu.map((m) => {
            const thisMenu = m.menuId === menuId;

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
            return { ...c, menu: [...c.menu, { menuId, qty: 1 }] };
          } else {
            return c;
          }
        }
      });

      setCart(newCart);
    } else {
      setCart((prev) => [...prev, { stanId, menu: [{ menuId, qty: 1 }] }]);
    }
  };

  const handleSubtractQuantity = (stanId: string, menuId: string) => {
    const existingStan = cart.find((c) => c.stanId === stanId);

    if (existingStan) {
      const newCart = cart
        .map((c) => {
          const existingMenu = c.menu.find((m) => m.menuId === menuId);

          if (existingMenu) {
            const newMenu = c.menu
              .map((m) => {
                const thisMenu = m.menuId === menuId;

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

  const handleDiskon = (menuId: string, diskonId: string) => {
    const newCart = cart.map((c) => {
      const newMenu = c.menu.map((m) => {
        const thisMenu = m.menuId === menuId;

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
    <main className="flex flex-col gap-4">
      <Input
        label="Search"
        id="search"
        name="search"
        onChange={(e) => {
          setFilterMenu(e.target.value);
        }}
      />
      <ul className="grid grid-cols-4 gap-4">
        {menus &&
          menus
            .filter((m) => m.namaMakanan.includes(filterMenu))
            .map((menu, i) => {
              const diskon = menu.menuDiskon.find(
                (m) =>
                  m.diskonId ===
                  cart
                    .find((c) => c.stanId === menu.stanId)
                    ?.menu.find((m) => m.menuId === menu.id)?.diskonId,
              )?.diskon.presentaseDiskon;

              const qty = cart
                .find((c) => c.stanId === menu.stanId)
                ?.menu.find((m) => m.menuId === menu.id)?.qty;

              const harga = diskon
                ? menu.harga * (1 - diskon / 100)
                : undefined;

              return (
                <li key={i} className="rounded-lg border p-2">
                  <Image
                    src={menu.foto}
                    alt="Menu Image"
                    width={500}
                    height={500}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  <p>{menu.namaMakanan}</p>
                  <p>{menu.deskripsi}</p>
                  <p className="flex flex-wrap gap-2 font-mono">
                    <span className={cn({ "line-through": harga })}>
                      {rupiah(menu.harga)}
                    </span>
                    {harga && <span>{rupiah(harga)}</span>}
                  </p>
                  {qty && (
                    <ul>
                      <li>
                        <label htmlFor={menu.id}>tanpa diskon</label>
                        <input
                          type="radio"
                          name={menu.id}
                          id={menu.id}
                          value={undefined}
                          defaultChecked
                          onChange={(e) =>
                            handleDiskon(menu.id, e.target.value)
                          }
                        />
                      </li>
                      {menu.menuDiskon.map((d, j) => (
                        <li key={j}>
                          <label htmlFor={d.id}>
                            {d.diskon.namaDiskon} {d.diskon.presentaseDiskon}%
                          </label>
                          <input
                            type="radio"
                            name={menu.id}
                            id={d.id}
                            value={d.diskonId}
                            onChange={(e) =>
                              handleDiskon(menu.id, e.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSubtractQuantity(menu.stanId, menu.id)}
                    className="block"
                  >
                    -
                  </button>
                  <p>{qty ?? 0}</p>
                  <button
                    type="button"
                    onClick={() => handleAddQuantity(menu.stanId, menu.id)}
                    className="block"
                  >
                    +
                  </button>
                </li>
              );
            })}
      </ul>
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
        className="fixed bottom-0 right-0 mb-8 mr-8"
      >
        <SubmitButton label="Create transaksi" />
      </Form>
    </main>
  );
};

export default MenuList;

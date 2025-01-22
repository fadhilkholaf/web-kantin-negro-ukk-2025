import Image from "next/image";

import { Prisma } from "@prisma/client";
import { cn } from "@/utils/cn";

interface TopMenuInterface
  extends Prisma.MenuGetPayload<{ include: { stan: true } }> {
  qty: number | null;
}

const TopMenusList = ({ menus }: { menus: TopMenuInterface[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {menus.map((m, i) => (
        <div key={i} className="flex-shrink-0 bg-white p-2">
          <div className="relative flex flex-col gap-2 border-4 border-double border-primary p-2 text-primary">
            <header>
              <p
                className={cn(
                  "absolute right-0 top-0 z-10 flex -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center rounded-full border border-primary bg-white px-2 py-1 font-italiana text-3xl font-bold tracking-wider",
                  { "text-red-500": i === 0 },
                  { "text-orange-500": i === 1 },
                  { "text-yellow-500": i === 2 },
                )}
              >
                <span>{m.qty ?? 0}</span>
                <span className="text-xs">Sold</span>
              </p>
              <Image
                src={m.foto}
                alt="Top Menu Image"
                width={500}
                height={500}
                className="aspect-square max-w-[250px] object-cover"
              />
            </header>
            <main className="flex h-full flex-col gap-2">
              <div>
                <p>{m.namaMakanan}</p>
                <p className="text-xs">{m.deskripsi}</p>
              </div>
              <p>{m.stan.namaStan}</p>
            </main>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopMenusList;

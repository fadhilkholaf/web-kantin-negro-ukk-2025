"use client";

import Image from "next/image";
import { useState } from "react";

import { AnimatePresence } from "motion/react";

import Landing from "./_parts/Landing";
import Menu from "./_components/Menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

const MainPage = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <main className="h-[200vh] w-full">
      <Image
        src="/images/noise.svg"
        alt="Noise"
        width={500}
        height={500}
        priority
        className="fixed left-0 top-0 -z-50 h-full w-full object-cover contrast-50"
      />
      <header>
        <Link
          href="/"
          className={cn(
            "font-italiana text-primary fixed left-0 top-0 z-50 m-8 text-2xl font-bold tracking-wider transition-colors",
            { "text-neutral": openMenu },
          )}
        >
          Kantin Negro
        </Link>
        <button
          type="button"
          onClick={() => setOpenMenu((prev) => !prev)}
          className={cn(
            "text-primary fixed right-0 top-0 z-50 m-8 flex items-center gap-4 transition-colors",
            { "text-neutral": openMenu },
          )}
        >
          Menu
          <span
            className={cn(
              "border-primary bg-neutral/10 w-[100px] rounded-full border p-2",
              { "text-neutral": openMenu },
            )}
          >
            {openMenu ? "Close" : "Open"}
          </span>
        </button>
      </header>
      <AnimatePresence mode="wait">
        {openMenu && <Menu onClick={() => setOpenMenu((prev) => !prev)} />}
      </AnimatePresence>
      <Landing />
    </main>
  );
};

export default MainPage;

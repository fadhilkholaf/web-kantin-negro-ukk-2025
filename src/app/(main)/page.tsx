"use client";

import Image from "next/image";
import { useState } from "react";

import { AnimatePresence } from "motion/react";

import Header from "./_components/Header";
import Landing from "./_parts/Landing";
import Menu from "./_components/Menu";

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
      <Header
        openMenu={openMenu}
        setOpenMenu={() => setOpenMenu((prev) => !prev)}
      />
      <AnimatePresence mode="wait">
        {openMenu && <Menu onClick={() => setOpenMenu((prev) => !prev)} />}
      </AnimatePresence>
      <Landing />
    </main>
  );
};

export default MainPage;

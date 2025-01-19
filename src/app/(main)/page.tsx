"use client";

import Image from "next/image";
import { Suspense, useState } from "react";

import { AnimatePresence } from "motion/react";

import Header from "./_components/Header";
import Menu from "./_components/Menu";
import Gallery from "./_parts/Gallery";
import Landing from "./_parts/Landing";

const MainPage = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <main className="w-full">
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
      <Suspense>
        <Gallery />
      </Suspense>
    </main>
  );
};

export default MainPage;

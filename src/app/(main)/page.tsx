"use client";

import { useState } from "react";

import { AnimatePresence } from "motion/react";

import Header from "./_components/Header";
import Menu from "./_components/Menu";
import FormSection from "./_parts/Form";
import GallerySection from "./_parts/Gallery";
import LandingSection from "./_parts/Landing";

const MainPage = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <main className="relative w-full overflow-hidden">
      <Header
        openMenu={openMenu}
        setOpenMenu={() => setOpenMenu((prev) => !prev)}
      />
      <AnimatePresence mode="wait">
        {openMenu && <Menu onClick={() => setOpenMenu((prev) => !prev)} />}
      </AnimatePresence>
      <LandingSection />
      <GallerySection />
      <FormSection />
    </main>
  );
};

export default MainPage;

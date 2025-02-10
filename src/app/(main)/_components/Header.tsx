import Link from "next/link";

import { motion, Variants } from "motion/react";

import { cn } from "@/utils/cn";

const wrapper: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.025 } },
};

const word: Variants = {
  initial: { opacity: 0, x: -25, y: 25, rotate: "30deg" },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: "0deg",
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Header = ({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: () => void;
}) => {
  return (
    <header
      className={cn(
        "fixed z-50 flex w-full items-center justify-between border-b border-primary bg-neutral/10 p-4 backdrop-blur-md lg:p-8",
        { "border-neutral bg-transparent": openMenu },
      )}
    >
      <Link
        href="/"
        className={cn(
          "font-italiana text-2xl font-bold tracking-wider text-primary transition-colors",
          { "text-neutral": openMenu },
        )}
      >
        <motion.span
          initial="initial"
          animate="animate"
          variants={wrapper}
          className="flex gap-x-2"
        >
          {"Kantin Negro".split(" ").map((w, i) => (
            <motion.span key={i}>
              {w.split("").map((c, j) => (
                <motion.span key={j} variants={word} className="inline-block">
                  {c}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.span>
      </Link>
      <button
        type="button"
        onClick={setOpenMenu}
        className={cn(
          "flex items-center gap-4 text-primary transition-colors",
          { "text-neutral": openMenu },
        )}
      >
        {openMenu ? "Close" : "Menu"}
        <span
          className={cn(
            "flex h-[42px] w-[42px] -rotate-45 items-center justify-center overflow-hidden rounded-full border border-primary bg-neutral/10 p-2 transition-transform duration-500",
            { "rotate-0 border-neutral text-neutral": openMenu },
          )}
        >
          <span className="text-2xl">⇄</span>
        </span>
      </button>
    </header>
  );
};

export default Header;

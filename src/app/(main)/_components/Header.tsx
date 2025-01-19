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
    <header>
      <Link
        href="/"
        className={cn(
          "font-italiana text-primary fixed left-0 top-0 z-50 m-4 text-2xl font-bold tracking-wider transition-colors lg:m-8",
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
          "text-primary fixed right-0 top-0 z-50 m-4 flex items-center gap-4 transition-colors lg:m-8",
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
  );
};

export default Header;

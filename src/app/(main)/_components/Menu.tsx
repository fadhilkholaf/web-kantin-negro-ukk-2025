import { motion, Variants } from "motion/react";

import { cn } from "@/utils/cn";

const wrapper: Variants = {
  initial: { backdropFilter: "brightness(1)" },
  animate: { backdropFilter: "brightness(0.75)" },
  exit: { backdropFilter: "brightness(1)" },
};

const card: Variants = {
  initial: { x: "-200%", y: "-25%", rotate: -30 },
  animate: {
    x: 0,
    y: 0,
    rotate: 6,
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1],
      duration: 0.5,
    },
  },
  exit: {
    x: "-200%",
    y: "-25%",
    rotate: -30,
    transition: {
      type: "tween",
      ease: [0.32, 0, 0.67, 0],
      duration: 0.5,
    },
  },
};

const Menu = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.nav
      key="nav"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={wrapper}
      className="fixed left-0 top-0 z-40 flex h-screen w-full items-center p-4 lg:p-8"
    >
      <div
        className="fixed left-0 top-0 -z-10 h-full w-full"
        onClick={onClick}
      ></div>
      <motion.div
        variants={card}
        className="h-[400px] w-[300px] origin-bottom-left bg-white p-4 text-2xl italic lg:h-1/2 lg:w-1/3"
      >
        <div className="flex h-full w-full flex-col justify-between border-4 border-double border-primary p-4 font-italiana text-primary">
          <header></header>
          <main className="h-full w-full">
            <ul className="flex flex-col gap-4 font-semibold tracking-wider">
              {["Our Menu", "Our Stand", "Your Table"].map((m, i) => (
                <li
                  key={i}
                  className={cn(
                    "relative flex w-full justify-between",
                    "before:ease-[cubic-bezier(0.65, 0, 0.35, 1)] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-500 before:hover:scale-100",
                  )}
                >
                  {m} <span className="font-mono">→</span>
                </li>
              ))}
            </ul>
          </main>
          <footer>
            <p className="text-xs font-black tracking-wider">
              Made for your pleasure by fadhilkholaf
            </p>
          </footer>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Menu;

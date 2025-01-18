import { motion, Variants } from "motion/react";

const wrapper: Variants = {
  initial: { backdropFilter: "brightness(1)" },
  animate: { backdropFilter: "brightness(0.5)" },
  exit: { backdropFilter: "brightness(1)" },
};

const Menu = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.nav
      key="nav"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={wrapper}
      className="fixed left-0 top-0 z-40 h-screen w-full p-8"
    >
      <div
        className="fixed left-0 top-0 -z-10 h-full w-full"
        onClick={onClick}
      ></div>
    </motion.nav>
  );
};

export default Menu;

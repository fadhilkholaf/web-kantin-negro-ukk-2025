import { motion, Variants } from "motion/react";

const container: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1],
      duration: 0.5,
      staggerChildren: 0.01,
    },
  },
};

const letter: Variants = {
  initial: { rotate: "12deg" },
  animate: {
    rotate: "0deg",
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1],
      duration: 0.5,
    },
  },
};

const underline: Variants = {
  initial: { scaleX: 0 },
  animate: (i) => ({
    scaleX: 1,
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.1,
    },
  }),
};

const underlinedWord = ["Your", "Perfect", "Foods", "Drinks"];

const Tag = ({
  i,
  letters,
  w,
}: {
  i: number;
  letters: string[];
  w: string;
}) => {
  return (
    <motion.span variants={item} className="relative inline-block">
      {letters.map((l, j) => (
        <motion.span key={j} variants={letter} className="inline-block">
          {l}
        </motion.span>
      ))}
      {underlinedWord.includes(w) && (
        <motion.span
          custom={i}
          variants={underline}
          className="absolute bottom-0 left-0 inline-block h-[2px] w-full origin-left rounded-full bg-primary"
        ></motion.span>
      )}
    </motion.span>
  );
};

const Landing = () => {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center bg-neutral/10 px-8">
      <motion.h1
        variants={container}
        initial="initial"
        animate="animate"
        className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-italiana text-[12vw] italic leading-[1] text-primary lg:w-1/2 lg:text-[8vw]"
      >
        {"Find Your Perfect Foods and Drinks".split(" ").map((w, i) => {
          const letters = w.split("");

          return <Tag key={i} i={i} letters={letters} w={w} />;
        })}
      </motion.h1>
    </section>
  );
};

export default Landing;

import Form from "next/form";
import { useState } from "react";

import { motion, Variants } from "motion/react";

const form: Variants = {
  initial: {
    x: [null, -150, 0],
    zIndex: 0,
    rotate: 12,
    pointerEvents: "none",
    filter: [null, "brightness(0.9)", "brightness(0.9) blur(2px)"],
    transition: {
      times: [0, 0.6, 1],
      type: "tween",
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  animate: {
    x: [null, 150, 0],
    zIndex: 1,
    rotate: 0,
    pointerEvents: "all",
    filter: [null, "brightness(1)", "brightness(1)"],
    transition: {
      times: [0, 0.6, 1],
      type: "tween",
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const SignInForm = ({ onClick }: { onClick: () => void }) => {
  return (
    <Form
      action={async (formData) => {
        console.log({
          username: formData.get("username"),
          password: formData.get("password"),
        });
      }}
      className="bg-white p-4"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Sign In Form
          </h1>
          <p className="text-xs">Book your table</p>
        </header>
        <main className="flex flex-col gap-2 font-mono">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-full border border-primary px-2 py-1 focus:outline-neutral"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className="rounded-full border border-primary px-2 py-1 focus:outline-neutral"
            />
          </div>
        </main>
        <footer className="flex flex-col gap-4 pt-2">
          <button
            type="submit"
            className="w-full rounded-full border border-primary px-2 py-1 text-center font-italiana font-bold tracking-wider"
          >
            Submit
          </button>
          <button
            type="button"
            className="flex justify-between text-sm underline underline-offset-4"
            onClick={onClick}
          >
            <p>{`Don't have an account?`}</p>
            <p>Sign Up</p>
          </button>
        </footer>
      </div>
    </Form>
  );
};

const SignUpForm = ({ onClick }: { onClick: () => void }) => {
  return (
    <Form
      action={async (formData) => {
        console.log({
          username: formData.get("username"),
          password: formData.get("password"),
        });
      }}
      className="bg-white p-4"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Sign Up Form
          </h1>
          <p className="text-xs">Book your table</p>
        </header>
        <main className="flex flex-col gap-2 font-mono">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-full border border-primary px-2 py-1 focus:outline-neutral"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-full border border-primary px-2 py-1 focus:outline-neutral"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className="rounded-full border border-primary px-2 py-1 focus:outline-neutral"
            />
          </div>
        </main>
        <footer className="flex flex-col gap-4 pt-2">
          <button
            type="submit"
            className="w-full rounded-full border border-primary px-2 py-1 text-center font-italiana font-bold tracking-wider"
          >
            Submit
          </button>
          <button
            type="button"
            className="flex justify-between text-sm underline underline-offset-4"
            onClick={onClick}
          >
            <p>Have an account?</p>
            <p>Sign In</p>
          </button>
        </footer>
      </div>
    </Form>
  );
};

const FormSection = () => {
  const [signIn, setSignIn] = useState<boolean>(true);

  return (
    <section className="flex min-h-screen w-full flex-col justify-center bg-neutral/10 text-primary">
      <header className="flex h-1/3 flex-col items-center justify-center gap-4 p-4 text-center text-primary lg:p-8">
        <h1 className="font-italiana text-[12vw] lg:text-[8vw]">
          Book Your Table
        </h1>
        <p className="font-sans tracking-wide">Sign in to your account.</p>
      </header>
      <main className="flex h-2/3 min-h-[600px] items-center justify-center">
        <motion.div
          initial="initial"
          whileInView={signIn ? "animate" : "initial"}
          variants={form}
          className="absolute transition-[z-index] duration-500"
        >
          <SignInForm onClick={() => setSignIn((prev) => !prev)} />
        </motion.div>
        <motion.div
          initial="animate"
          whileInView={!signIn ? "animate" : "initial"}
          variants={form}
          className="absolute transition-[z-index] duration-500"
        >
          <SignUpForm onClick={() => setSignIn((prev) => !prev)} />
        </motion.div>
      </main>
    </section>
  );
};

export default FormSection;

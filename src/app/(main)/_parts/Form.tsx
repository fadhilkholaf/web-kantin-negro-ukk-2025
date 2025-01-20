import Form from "next/form";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { motion, Variants } from "motion/react";
import { Role } from "@prisma/client";
import { toast } from "sonner";

import { signInAction, signUpAction } from "@/action/auth";
import { SubmitButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { cn } from "@/utils/cn";

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

const roles: { label: string; value: Role }[] = [
  { label: "Siswa", value: "siswa" },
  { label: "Admin Stan", value: "adminStan" },
];

const SignInForm = ({ onClick }: { onClick: () => void }) => {
  const router = useRouter();

  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading("Sign in...");

        const response = await signInAction(formData);

        if (response.success) {
          toast.success("Sign in success!", { id: loading });

          router.refresh();
        } else {
          toast.error(response.message, { id: loading });
        }
      }}
      className="bg-white p-4"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Sign In Form
          </h1>
          <p className="text-xs">Welcome again!</p>
        </header>
        <main className="flex flex-col gap-2">
          <Input
            label="Username"
            required
            type="text"
            id="username"
            name="username"
          />
          <Input
            label="Password"
            required
            type="text"
            id="password"
            name="password"
          />
        </main>
        <footer className="flex flex-col gap-4 pt-2">
          <SubmitButton label="Submit" />
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
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  return (
    <Form
      action={async (formData) => {
        const loading = toast.loading("Sign up...");

        const response = await signUpAction(formData);

        if (response.success) {
          toast.success(response.message, { id: loading });

          router.refresh();
        } else {
          setRole(null);

          toast.error(response.message, { id: loading });
        }
      }}
      className="bg-white p-4"
    >
      <div className="flex flex-col gap-8 border-4 border-double border-primary p-4">
        <header>
          <h1 className="font-italiana text-3xl font-bold tracking-wider">
            Sign Up Form
          </h1>
          <p className="text-xs">Get yourself ready!</p>
        </header>
        <main className="flex flex-col gap-2">
          <Input
            label="Username"
            required
            type="text"
            id="usernameU"
            name="usernameU"
          />
          <Input
            label="Password"
            required
            type="text"
            id="passwordU"
            name="passwordU"
          />
          <div className="flex flex-col">
            <label htmlFor="role">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {roles &&
                roles.map((r, i) => (
                  <Fragment key={i}>
                    <div className="w-full">
                      <label
                        htmlFor={r.value}
                        className={cn(
                          "block cursor-pointer rounded-full border border-primary px-2 py-1 text-center",
                          {
                            "bg-primary text-white": role === r.value,
                          },
                        )}
                      >
                        {r.label}
                      </label>
                      <input
                        type="radio"
                        name="roleU"
                        id={r.value}
                        value={r.value}
                        className="hidden"
                        onClick={() => setRole(r.value)}
                      />
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </main>
        <footer className="flex flex-col gap-4 pt-2">
          <SubmitButton label="Submit" />
          <button
            type="button"
            className="flex justify-between text-sm underline underline-offset-4"
            onClick={onClick}
          >
            <p>{`Have an account?`}</p>
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

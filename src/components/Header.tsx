"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import { motion, Variants } from "motion/react";
import { Session } from "next-auth";

import { cn } from "@/utils/cn";

interface Menu {
  title: string;
  url: string;
}

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

const mainMenus: Menu[] = [
  {
    title: "Home",
    url: "/",
  },
];

const siswaMenus: Menu[] = [
  {
    title: "Dashboard",
    url: "/siswa",
  },
  {
    title: "Menu",
    url: "/siswa/menu",
  },
  {
    title: "Pesanan",
    url: "/siswa/pesanan",
  },
  {
    title: "History",
    url: "/siswa/history",
  },
];

const adminStanMenus: Menu[] = [
  {
    title: "Dashboard",
    url: "/admin-stan",
  },
  {
    title: "Menu",
    url: "/admin-stan/menu",
  },
  {
    title: "Diskon",
    url: "/admin-stan/diskon",
  },
  {
    title: "Pesanan",
    url: "/admin-stan/pesanan",
  },
  {
    title: "History",
    url: "/admin-stan/history",
  },
  {
    title: "Pelanggan",
    url: "/admin-stan/pelanggan",
  },
];

const authMenus: Menu[] = [
  {
    title: "Sign Up",
    url: "/signup",
  },
  {
    title: "Sign In",
    url: "/signin",
  },
];

const NavLink = ({ children, url }: { children: ReactNode; url: string }) => {
  return (
    <Link
      href={url}
      className="relative text-primary before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:bg-primary before:transition-transform before:hover:origin-left before:hover:scale-x-100"
    >
      {children}
    </Link>
  );
};

const Header = ({
  session,
  foto,
}: {
  session: Session | null;
  foto?: string;
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleRezize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleRezize();

    window.addEventListener("resize", handleRezize);

    return () => {
      window.removeEventListener("resize", handleRezize);
    };
  });

  return (
    <header>
      {isMobile && (
        <div className="fixed left-0 top-0 z-40 h-[74px] w-full border-b border-primary bg-neutral/10 backdrop-blur-md"></div>
      )}
      <nav
        className={cn(
          "ease-[cubic-bezier(0.65, 0, 0.35, 1)] fixed z-40 w-full -translate-y-0 border-b border-primary bg-neutral/10 p-4 pt-[74px] backdrop-blur-md transition-transform duration-500 lg:p-8",
          { "-translate-y-full": isMobile && !openMenu },
        )}
      >
        <ul className="flex w-full flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-x-8">
          <li>
            <ul className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-8">
              {mainMenus &&
                !session &&
                mainMenus.map((menu, i) => (
                  <li key={i}>
                    <NavLink url={menu.url}>{menu.title}</NavLink>
                  </li>
                ))}
              {session &&
                (session.user.role === "siswa"
                  ? siswaMenus &&
                    siswaMenus.map((menu, i) => (
                      <li key={i}>
                        <NavLink url={menu.url}>{menu.title}</NavLink>
                      </li>
                    ))
                  : adminStanMenus &&
                    adminStanMenus.map((menu, i) => (
                      <li key={i}>
                        <NavLink url={menu.url}>{menu.title}</NavLink>
                      </li>
                    )))}
            </ul>
          </li>
          <li>
            <ul className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:gap-x-8">
              {session ? (
                <>
                  <li>
                    <NavLink url="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink url="/profile">{session.user.username}</NavLink>
                  </li>
                  {session.user.role === "siswa" && (
                    <li>
                      <Link
                        href="/profile"
                        className="block w-fit overflow-hidden rounded-full border border-primary"
                      >
                        <Image
                          src={foto ?? "/images/dummy4.jpg"}
                          alt="Profile Picture"
                          width={40}
                          height={40}
                          className="aspect-square object-cover"
                        />
                      </Link>
                    </li>
                  )}
                  <li>
                    <NavLink url="/signout">Sign Out</NavLink>
                  </li>
                </>
              ) : (
                authMenus &&
                authMenus.map((menu, i) => (
                  <li key={i}>
                    <NavLink url={menu.url}>{menu.title}</NavLink>
                  </li>
                ))
              )}
            </ul>
          </li>
        </ul>
      </nav>
      {isMobile && (
        <>
          <Link
            href="/"
            className="fixed z-50 m-4 flex h-[42px] items-center font-italiana text-2xl font-bold tracking-wider text-primary transition-colors"
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
                    <motion.span
                      key={j}
                      variants={word}
                      className="inline-block"
                    >
                      {c}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.span>
          </Link>
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            className="fixed right-0 top-0 z-50 m-4 flex items-center gap-4 text-primary transition-colors"
          >
            {openMenu ? "Close" : "Menu"}
            <span
              className={cn(
                "flex h-[42px] w-[42px] -rotate-45 items-center justify-center overflow-hidden rounded-full border border-primary bg-neutral/10 p-2 transition-transform duration-500",
                { "rotate-0": openMenu },
              )}
            >
              <span className="text-2xl">⇄</span>
            </span>
          </button>
        </>
      )}
    </header>
  );
};

export default Header;

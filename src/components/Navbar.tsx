import Link from "next/link";
import Image from "next/image";

import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";

import { LinkButton } from "./Button";

export const revalidate = 0;

interface Menu {
  title: string;
  url: string;
}

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
    title: "Pelanggan",
    url: "/admin-stan/pelanggan",
  },
  {
    title: "History",
    url: "/admin-stan/history",
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

const ProfilePicture = async ({ userId }: { userId: string }) => {
  const userSiswa = await findSiswa({ userId });

  return (
    <Image
      src={(userSiswa && userSiswa.foto) ?? "/images/dummy.jpg"}
      alt="Profile Picture"
      width={40}
      height={40}
      className="aspect-square object-cover"
    />
  );
};

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="fixed w-full bg-white/50 p-8 backdrop-blur">
      <ul className="flex justify-between">
        <li>
          <ul className="flex gap-2">
            {mainMenus &&
              mainMenus.map((menu, i) => (
                <li key={i}>
                  <LinkButton href={menu.url}>{menu.title}</LinkButton>
                </li>
              ))}
            {session &&
              (session.user.role === "siswa"
                ? siswaMenus &&
                  siswaMenus.map((menu, i) => (
                    <li key={i}>
                      <LinkButton href={menu.url}>{menu.title}</LinkButton>
                    </li>
                  ))
                : adminStanMenus &&
                  adminStanMenus.map((menu, i) => (
                    <li key={i}>
                      <LinkButton href={menu.url}>{menu.title}</LinkButton>
                    </li>
                  )))}
          </ul>
        </li>
        <li>
          <ul className="flex gap-2">
            {session ? (
              <>
                <li>
                  <LinkButton href="/profile">Profile</LinkButton>
                </li>
                <li>
                  <LinkButton href="/profile">
                    {session.user.username}
                  </LinkButton>
                </li>
                {session.user.role === "siswa" && (
                  <li>
                    <Link
                      href="/profile"
                      className="block overflow-hidden rounded-full border"
                    >
                      <ProfilePicture userId={session.user.id} />
                    </Link>
                  </li>
                )}
                <li>
                  <LinkButton href="/signout">Sign Out</LinkButton>
                </li>
              </>
            ) : (
              authMenus &&
              authMenus.map((menu, i) => (
                <li key={i}>
                  <LinkButton href={menu.url}>{menu.title}</LinkButton>
                </li>
              ))
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

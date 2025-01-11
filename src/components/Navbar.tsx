import Link from "next/link";
import Image from "next/image";

import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";

interface Menu {
  title: string;
  url: string;
}

const menus: Menu[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Siswa",
    url: "/siswa",
  },
  {
    title: "Admin Stan",
    url: "/admin-stan",
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
      src={(userSiswa && userSiswa.foto) ?? "/dummy.jpg"}
      alt="Profile Picture"
      width={40}
      height={40}
      priority
      className="aspect-square object-cover"
    />
  );
};

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full p-8">
      <ul className="flex justify-between">
        <li>
          <ul className="flex gap-2">
            {menus &&
              menus.map((menu, i) => (
                <li key={i}>
                  <Link href={menu.url} className="block rounded-lg border p-2">
                    {menu.title}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <ul className="flex gap-2">
            {session ? (
              <>
                <li>
                  <Link href="/profile" className="block rounded-lg border p-2">
                    {session.user.username}
                  </Link>
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
                  <Link href="/signout" className="block rounded-lg border p-2">
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              authMenus &&
              authMenus.map((menu, i) => (
                <li key={i}>
                  <Link href={menu.url} className="block rounded-lg border p-2">
                    {menu.title}
                  </Link>
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

import Link from "next/link";

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
    title: "Sign Up",
    url: "/signup",
  },
  {
    title: "Sign In",
    url: "/signin",
  },
  {
    title: "Sign Out",
    url: "/signout",
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

const Navbar = async () => {
  const session = await auth();

  return (
    <nav>
      <ul>
        <li>
          <p>{session ? `Log in as ${session.user.username}` : "Not log in"}</p>
        </li>
        {menus &&
          menus.map((menu, i) => (
            <li key={i}>
              <Link href={menu.url}>{menu.title}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";

interface Menu {
  title: string;
  url: string;
}

const menus: { header: Menu[]; main: Menu[]; footer: Menu[] } = {
  header: [{ title: "Dashboard", url: "/admin-stan" }],
  main: [
    { title: "Menu", url: "/admin-stan/menu" },
    { title: "Diskon", url: "/admin-stan/diskon" },
    { title: "Pelanggan", url: "/admin-stan/pelanggan" },
    { title: "History", url: "/admin-stan/history" },
  ],
  footer: [
    { title: "Home", url: "/" },
    { title: "Profile", url: "/profile" },
    { title: "Sign Out", url: "/signout" },
  ],
};

const Menus = ({ menus }: { menus: Menu[] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {menus &&
        menus.map((menu, i) => (
          <li key={i}>
            <Link
              href={menu.url}
              className="block rounded-lg border p-2 hover:bg-gray-200"
            >
              {menu.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed flex h-screen w-[300px] flex-col justify-between gap-4 border-r p-8">
      {menus && (
        <>
          <header>
            <Menus menus={menus.header} />
          </header>
          <hr />
          <main className="h-full">
            <Menus menus={menus.main} />
          </main>
          <hr />
          <footer>
            <Menus menus={menus.footer} />
          </footer>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

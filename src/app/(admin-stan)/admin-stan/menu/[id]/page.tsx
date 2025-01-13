import { redirect } from "next/navigation";

import { findMenu } from "@/database/menu";

import MenuForm from "./_components/MenuForm";

const MenuFormPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  if (id === "new") {
    return (
      <main>
        <MenuForm />
      </main>
    );
  }

  const menu = await findMenu({ id });

  if (!menu) {
    redirect("/not-found");
  }

  return (
    <main>
      <MenuForm menu={menu} />
    </main>
  );
};

export default MenuFormPage;

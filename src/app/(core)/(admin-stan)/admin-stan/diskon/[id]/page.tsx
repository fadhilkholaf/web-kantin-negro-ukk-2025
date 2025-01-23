import { notFound } from "next/navigation";

import { findDiskon } from "@/database/diskon";

import DiskonForm from "./_components/DiskonForm";

const DiskonFormPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  if (id === "new") {
    return (
      <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
        <DiskonForm />
      </main>
    );
  }

  const diskon = await findDiskon({ id });

  if (!diskon) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <DiskonForm diskon={diskon} />
    </main>
  );
};

export default DiskonFormPage;

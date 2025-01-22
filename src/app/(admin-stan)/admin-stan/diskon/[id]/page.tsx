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
      <main>
        <DiskonForm />
      </main>
    );
  }

  const diskon = await findDiskon({ id });

  if (!diskon) {
    notFound();
  }

  return (
    <main>
      <DiskonForm diskon={diskon} />
    </main>
  );
};

export default DiskonFormPage;

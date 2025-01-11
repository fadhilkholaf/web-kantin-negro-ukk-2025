"use server";

import { revalidatePath } from "next/cache";

import { createStan, updateStan } from "@/database/stan";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";

export const createStanProfile = async (formData: FormData) => {
  const namaStan = formData.get("namaStan") as string;
  const namaPemilik = formData.get("namaPemilik") as string;
  const telp = formData.get("telp") as string;

  if (!namaStan || !namaPemilik || !telp) {
    return responseError("Please fill all fields!");
  }

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    await createStan({
      user: { connect: { id: session.user.id } },
      namaStan,
      namaPemilik,
      telp,
    });

    revalidatePath("/", "layout");
    return responseSuccess("Success creating stan profile!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const updateStanProfile = async (formData: FormData) => {
  const namaStan = formData.get("namaStan") as string;
  const namaPemilik = formData.get("namaPemilik") as string;
  const telp = formData.get("telp") as string;

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    await updateStan(
      { userId: session.user.id },
      {
        namaStan: namaStan ?? undefined,
        namaPemilik: namaPemilik ?? undefined,
        telp: telp ?? undefined,
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating stan profile!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

"use server";

import { revalidatePath } from "next/cache";

import { UploadApiErrorResponse } from "cloudinary";
import { Jenis } from "@prisma/client";

import { createMenu, deleteMenu, findMenu, updateMenu } from "@/database/menu";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";

import { deleteImage, uploadImage } from "./cloudinary";

export const createMenuAction = async (formData: FormData) => {
  const namaMakanan = formData.get("namaMakanan") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const harga = Number(formData.get("harga") as string);
  const jenis = formData.get("jenis") as Jenis;
  const foto = formData.get("foto") as File;

  if (!namaMakanan || !deskripsi || !harga || !jenis || !foto.size) {
    return responseError("Please fill all fields!");
  }

  if (Number.isNaN(harga)) {
    return responseError("Harga must be a number!");
  }

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    const createdMenu = await createMenu({
      stan: { connect: { userId: session.user.id } },
      namaMakanan,
      deskripsi,
      harga,
      jenis,
      foto: "/images/dummy.jpg",
    });

    const uploadedImage = await uploadImage(foto, createdMenu.id, true);

    if (!uploadedImage) {
      return responseError("Error uploading image!");
    }

    await updateMenu(
      { id: createdMenu.id },
      { foto: uploadedImage.secure_url },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success creating menu!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

export const updateMenuAction = async (formData: FormData, id: string) => {
  const namaMakanan = formData.get("namaMakanan") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const harga = Number(formData.get("harga") as string);
  const jenis = formData.get("jenis") as Jenis;
  const foto = formData.get("foto") as File;

  if (Number.isNaN(harga)) {
    return responseError("Harga must be a number!");
  }

  try {
    let uploadedImage;

    if (foto.size) {
      uploadedImage = await uploadImage(foto, id, true);
    }

    await updateMenu(
      { id },
      {
        namaMakanan: namaMakanan ?? undefined,
        deskripsi: deskripsi ?? undefined,
        harga: harga ?? undefined,
        jenis: jenis ?? undefined,
        foto: uploadedImage?.secure_url ?? undefined,
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating menu!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

export const deleteMenuAction = async (id: string) => {
  try {
    const existingMenu = await findMenu({ id });

    if (!existingMenu) {
      return responseError("Menu does not exist!");
    }

    await deleteMenu({ id });

    await deleteImage(id);

    revalidatePath("/", "layout");
    return responseSuccess("Success deleting menu!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

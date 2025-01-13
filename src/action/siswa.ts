"use server";

import { revalidatePath } from "next/cache";

import { UploadApiErrorResponse } from "cloudinary";

import { createSiswa, updateSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";

import { uploadImage } from "./cloudinary";

export const createSiswaProfile = async (formData: FormData) => {
  const namaSiswa = formData.get("namaSiswa") as string;
  const alamat = formData.get("alamat") as string;
  const telp = formData.get("telp") as string;
  const foto = formData.get("foto") as File;

  if (!namaSiswa || !alamat || !telp || !foto.size) {
    return responseError("Please fill all fields!");
  }

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    const uploadedImage = await uploadImage(foto, session.user.id);

    if (!uploadedImage) {
      return responseError("Error uploading image!");
    }

    await createSiswa({
      user: { connect: { id: session.user.id } },
      namaSiswa,
      alamat,
      telp,
      foto: uploadedImage.secure_url,
    });

    revalidatePath("/", "layout");
    return responseSuccess("Success creating siswa profile!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

export const updateSiswaProfile = async (formData: FormData) => {
  const namaSiswa = formData.get("namaSiswa") as string;
  const alamat = formData.get("alamat") as string;
  const telp = formData.get("telp") as string;
  const foto = formData.get("foto") as File;

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    let uploadedImage;

    if (foto.size) {
      uploadedImage = await uploadImage(foto, session.user.id);
    }

    await updateSiswa(
      { userId: session.user.id },
      {
        namaSiswa: namaSiswa ?? undefined,
        alamat: alamat ?? undefined,
        telp: telp ?? undefined,
        foto: uploadedImage ? uploadedImage.secure_url : undefined,
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating profile!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

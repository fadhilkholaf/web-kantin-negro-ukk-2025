"use server";

import { revalidatePath } from "next/cache";

import { UploadApiErrorResponse } from "cloudinary";

import { createSiswa, updateSiswa } from "@/database/siswa";
import { responseError, responseSuccess } from "@/utils/responseFunction";

import { uploadImage } from "./cloudinary";

export const createPelangganProfile = async (
  formData: FormData,
  id: string,
) => {
  const namaSiswa = formData.get("namaSiswa") as string;
  const alamat = formData.get("alamat") as string;
  const telp = formData.get("telp") as string;
  const foto = formData.get("foto") as File;

  if (!namaSiswa || !alamat || !telp || !foto.size) {
    return responseError("Please fill all fields!");
  }

  try {
    const uploadedImage = await uploadImage(foto, id);

    if (!uploadedImage) {
      return responseError("Error uploading image!");
    }

    await createSiswa({
      user: { connect: { id: id } },
      namaSiswa,
      alamat,
      telp,
      foto: uploadedImage.secure_url,
    });

    revalidatePath("/", "layout");
    return responseSuccess("Success creating pelanggan profile!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

export const updatePelangganProfile = async (
  formData: FormData,
  id: string,
) => {
  const namaSiswa = formData.get("namaSiswa") as string;
  const alamat = formData.get("alamat") as string;
  const telp = formData.get("telp") as string;
  const foto = formData.get("foto") as File;

  try {
    let uploadedImage;

    if (foto.size) {
      uploadedImage = await uploadImage(foto, id);
    }

    await updateSiswa(
      { userId: id },
      {
        namaSiswa: namaSiswa ?? undefined,
        alamat: alamat ?? undefined,
        telp: telp ?? undefined,
        foto: uploadedImage ? uploadedImage.secure_url : undefined,
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating pelanggan profile!");
  } catch (error) {
    console.log(error);

    return responseError(
      (error as UploadApiErrorResponse).message ?? "Something went wrong!",
    );
  }
};

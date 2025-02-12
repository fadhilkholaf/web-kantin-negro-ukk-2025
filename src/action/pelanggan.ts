"use server";

import { revalidatePath } from "next/cache";

import { UploadApiErrorResponse } from "cloudinary";

import { createSiswa, updateSiswa } from "@/database/siswa";
import {
  createUser,
  findManyUsers,
  findUser,
  updateUser,
} from "@/database/user";
import { deleteUserStan } from "@/database/user-stan";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { hash } from "@/utils/hash";

import { uploadImage } from "./cloudinary";

export const createPelangganAction = async (formData: FormData) => {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return responseError("Please fill all fields!");
    }

    const existingPelanggan = await findUser({ username });

    if (existingPelanggan) {
      return responseError("Pelanggan already exist!");
    }

    const hashedPassword = hash(password);

    const user = await createUser({
      username,
      password: hashedPassword,
      role: "siswa",
    });

    revalidatePath("/", "layout");
    return { ...responseSuccess("Success creating pelanggan!"), id: user.id };
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const updatePelangganAction = async (formData: FormData) => {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const id = formData.get("id") as string;

    if (!id) {
      return responseError("Missing pelanggan id!");
    }

    const existingPelanggan = await findManyUsers({
      AND: [{ NOT: { id } }, { username }],
    });

    if (existingPelanggan.length) {
      return responseError("Pelanggan already exist!");
    }

    const hashedPassword = hash(password);

    await updateUser(
      { id },
      {
        username: username ?? undefined,
        password: password !== "" ? hashedPassword : undefined,
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating pelanggan!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const createPelangganProfileAction = async (
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

export const updatePelangganProfileAction = async (
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

export const blockPelangganAction = async (
  userId: string,
  stanUserId: string,
) => {
  try {
    await updateUser(
      { id: userId },
      {
        blockedStan: { create: { stan: { connect: { userId: stanUserId } } } },
      },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success blocking user!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const unblocPelangganAction = async (id: string) => {
  try {
    await deleteUserStan({ id });

    revalidatePath("/", "layout");
    return responseSuccess("Success unblocking user!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

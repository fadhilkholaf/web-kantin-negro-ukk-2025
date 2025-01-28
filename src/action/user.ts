"use server";

import { revalidatePath } from "next/cache";

import { Role } from "@prisma/client";

import {
  createUser,
  deleteUser,
  findManyUsers,
  findUser,
  updateUser,
} from "@/database/user";
import { auth } from "@/lib/auth";
import { hash } from "@/utils/hash";
import { responseError, responseSuccess } from "@/utils/responseFunction";

import { deleteImage } from "./cloudinary";

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

    await createUser({ username, password, role: "siswa" });

    revalidatePath("/", "layout");
    return responseSuccess("Success creating pelanggan!");
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

export const updateUserProfile = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  try {
    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    const existingUser = await findManyUsers({
      AND: [{ NOT: { id: session.user.id } }, { username }],
    });

    if (existingUser.length) {
      return responseError("Username already used!");
    }

    const hashedPassword = hash(password);

    const updatedUser = await updateUser(
      { id: session.user.id },
      {
        username: username ?? undefined,
        password: password !== "" ? hashedPassword : undefined,
        role: role ?? undefined,
      },
    );

    revalidatePath("/", "layout");
    return {
      updatedUser,
      ...responseSuccess("Success updating user!"),
    };
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const deleteUserAction = async (id: string) => {
  try {
    const existingUser = await findUser({ id });

    if (!existingUser) {
      return responseError("User not found!");
    }

    await deleteUser({ id });

    await deleteImage(`ukk-2025/${id}`);

    revalidatePath("/", "layout");
    return responseSuccess("Success updating user!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

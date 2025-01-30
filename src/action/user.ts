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
import { deleteUserStan } from "@/database/user-stan";

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
        verified: true,
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

export const blockUserAction = async (userId: string, stanUserId: string) => {
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

export const unblockUserAction = async (id: string) => {
  try {
    await deleteUserStan({ id });

    revalidatePath("/", "layout");
    return responseSuccess("Success unblocking user!");
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

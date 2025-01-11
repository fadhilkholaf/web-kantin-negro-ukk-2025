"use server";

import { revalidatePath } from "next/cache";

import { Role } from "@prisma/client";

import { findManyUsers, updateUser } from "@/database/user";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";

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

    const updatedUser = await updateUser(
      { id: session.user.id },
      {
        username: username ?? undefined,
        password: password ?? undefined,
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

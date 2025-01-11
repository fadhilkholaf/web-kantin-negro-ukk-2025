"use server";

import { AuthError } from "next-auth";
import { Role } from "@prisma/client";

import { createUser, findUser } from "@/database/query";
import { signIn } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData, role: Role) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password || !role) {
    return responseError("Please fill all fields!");
  }

  try {
    const existingUser = await findUser({ username });

    if (existingUser) {
      return responseError("User already exist!");
    }

    await createUser({ username, password, role });

    revalidatePath("/", "layout");
    return responseSuccess("Sign up success!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const signInAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return responseError("Please fill all fields!");
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return responseError("Invalid credentials!");
        default:
          return responseError("Something went wrong!");
      }
    }

    throw error;
  }
};

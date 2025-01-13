"use server";

import { AuthError } from "next-auth";
import { Role } from "@prisma/client";

import { createUser, findUser } from "@/database/user";
import { signIn } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  if (!username || !password || !role) {
    return responseError("Please fill all fields!");
  }

  try {
    const existingUser = await findUser({ username });

    if (existingUser) {
      return responseError("User already exist!");
    }

    const createdUser = await createUser({ username, password, role });

    await signIn("credentials", {
      username: createdUser.username,
      password: createdUser.password,
      redirect: false,
    });

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
    return responseSuccess("Sign in success!");
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

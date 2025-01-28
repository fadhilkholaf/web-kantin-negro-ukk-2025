"use server";

import { revalidatePath } from "next/cache";

import { AuthError } from "next-auth";
import { Role } from "@prisma/client";

import { createUser, findUser } from "@/database/user";
import { signIn } from "@/lib/auth";
import { hash } from "@/utils/hash";
import { responseError, responseSuccess } from "@/utils/responseFunction";

export const signUpAction = async (formData: FormData) => {
  const username = formData.get("usernameU") as string;
  const password = formData.get("passwordU") as string;
  const role = formData.get("roleU") as Role;

  if (!username || !password || !role) {
    return responseError("Please fill all fields!");
  }

  try {
    const existingUser = await findUser({ username });

    if (existingUser) {
      return responseError("User already exist!");
    }

    const hashedPassword = hash(password);

    await createUser({
      username,
      password: hashedPassword,
      role,
    });

    await signIn("credentials", {
      username: username,
      password: password,
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

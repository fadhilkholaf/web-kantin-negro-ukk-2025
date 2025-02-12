"use server";

import { revalidatePath } from "next/cache";

import {
  createDiskon,
  deleteDiskon,
  findDiskon,
  updateDiskon,
} from "@/database/diskon";
import {
  createMenuDiskon,
  deleteMenuDiskon,
  findManyMenuDiskon,
} from "@/database/menu-diskon";
import { auth } from "@/lib/auth";
import { responseError, responseSuccess } from "@/utils/responseFunction";

export const createDiskonAction = async (formData: FormData) => {
  try {
    const namaDiskon = formData.get("namaDiskon") as string;
    const presentaseDiskon = Number(formData.get("presentaseDiskon") as string);
    const tanggalAwal = new Date(formData.get("tanggalAwal") as string);
    const tanggalAkhir = new Date(formData.get("tanggalAkhir") as string);

    if (!namaDiskon || !presentaseDiskon || !tanggalAwal || !tanggalAkhir) {
      return responseError("Please fill all fields!");
    }

    if (Number.isNaN(presentaseDiskon)) {
      return responseError("Persentase diskon must be a number!");
    }

    if (Number.isNaN(tanggalAwal) || Number.isNaN(tanggalAkhir)) {
      return responseError("Invalid date!");
    }

    const session = await auth();

    if (!session) {
      return responseError("Unauthenticated!");
    }

    await createDiskon({
      stan: { connect: { userId: session.user.id } },
      namaDiskon,
      presentaseDiskon,
      tanggalAwal: tanggalAwal,
      tanggalAkhir: tanggalAkhir,
    });

    revalidatePath("/", "layout");
    return responseSuccess("Success creating diskon");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const updateDiskonAction = async (formData: FormData, id: string) => {
  try {
    const namaDiskon = formData.get("namaDiskon") as string;
    const presentaseDiskon = Number(formData.get("presentaseDiskon") as string);
    const tanggalAwal = new Date(formData.get("tanggalAwal") as string);
    const tanggalAkhir = new Date(formData.get("tanggalAkhir") as string);

    if (!namaDiskon || !presentaseDiskon || !tanggalAwal || !tanggalAkhir) {
      return responseError("Please fill all fields!");
    }

    if (Number.isNaN(presentaseDiskon)) {
      return responseError("Persentase diskon must be a number!");
    }

    if (Number.isNaN(tanggalAwal) || Number.isNaN(tanggalAkhir)) {
      return responseError("Invalid date!");
    }

    await updateDiskon(
      { id },
      { namaDiskon, presentaseDiskon, tanggalAwal, tanggalAkhir },
    );

    revalidatePath("/", "layout");
    return responseSuccess("Success updating diskon");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const deleteDiskonAction = async (id: string) => {
  try {
    const existingDiskon = await findDiskon({ id });

    if (!existingDiskon) {
      return responseError("Diskon doesn't exist!");
    }

    await deleteDiskon({ id });

    revalidatePath("/", "layout");
    return responseSuccess("Success deleting diskon");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const applyDiskonAction = async (menuId: string, diskonId: string) => {
  try {
    await createMenuDiskon({
      diskon: { connect: { id: diskonId } },
      menu: { connect: { id: menuId } },
    });

    revalidatePath("/", "layout");
    return responseSuccess("Diskon applied!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const removeDiskonAction = async (id: string) => {
  try {
    await deleteMenuDiskon({ id });

    revalidatePath("/", "layout");
    return responseSuccess("Diskon removed!");
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

export const checkMenuDiskonAction = async (
  menuId: string,
  diskonId: string,
) => {
  try {
    const isApplied = await findManyMenuDiskon({
      AND: [{ menuId }, { diskonId }],
    });

    if (isApplied.length) {
      return await removeDiskonAction(isApplied[0].id);
    } else {
      return await applyDiskonAction(menuId, diskonId);
    }
  } catch (error) {
    console.log(error);

    return responseError("Something went wrong!");
  }
};

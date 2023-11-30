"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z
    .string()
    .min(3, { message: "Mininum length of 3 letters is requiered" }),
});

export async function create(prevState: State, formDate: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formDate.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return { message: "Database error" };
  }

  revalidatePath("/organization/org_2YlEFn5gmShVRkrr05R8gSHuDxv");
  redirect("/organization/org_2YlEFn5gmShVRkrr05R8gSHuDxv");
}

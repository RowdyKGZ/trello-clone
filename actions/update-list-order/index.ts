"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

import { InputType, ReturnType } from "./types";
import { UpdateOrderList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: { id: list.id, board: { orgId } },
        data: { order: list.order },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Error to update order lists",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateOrderList = createSafeAction(UpdateOrderList, handler);

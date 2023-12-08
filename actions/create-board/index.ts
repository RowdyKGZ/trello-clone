"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";
import { createAuditLog } from "@/lib/create-audit-log";

import { InputType, RetunrType } from "./types";
import { CreateBoard } from "./schema";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<RetunrType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvailableCount();

  if (!canCreate) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        imageId,
        orgId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUserName,
      },
    });

    await incrementAvailableCount();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create board.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

import { z } from "zod";

export const UpdateOrderList = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardId: z.string(),
});

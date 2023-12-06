import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateOrderList } from "./schema";

export type InputType = z.infer<typeof UpdateOrderList>;
export type ReturnType = ActionState<InputType, List[]>;

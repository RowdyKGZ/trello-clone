import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateList } from "./schema";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType, List>;

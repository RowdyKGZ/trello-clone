import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { CopyList } from "./schema";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;

import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";

import { UpdateOrderCard } from "./schema";

export type InputType = z.infer<typeof UpdateOrderCard>;
export type ReturnType = ActionState<InputType, Card[]>;

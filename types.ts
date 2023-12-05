import { Card, List } from "@prisma/client";

export type ListWithCard = List & { card: Card[] };

export type CardWitchList = Card & { list: List };

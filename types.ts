import { Card, List } from "@prisma/client";

export type ListWithCard = List & { cards: Card[] };

export type CardWitchList = Card & { list: List };

"use client";

import { List } from "@prisma/client";

import { ListWithCard } from "@/types";
import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol className="pt-5 pl-5">
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

"use client";

import { useEffect, useState } from "react";

import { ListWithCard } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  return (
    <ol className="pt-5 pl-5 flex gap-x-3 h-full items-center">
      {orderData.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

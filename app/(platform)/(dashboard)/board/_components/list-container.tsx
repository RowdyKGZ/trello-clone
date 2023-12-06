"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCard } from "@/types";
import { useAction } from "@/hooks/use-action";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { updateOrderList } from "@/actions/update-list-order";
import { updateOrderCard } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const { execute: executeUpdateOrderList } = useAction(updateOrderList, {
    onSuccess: () => {
      toast.success("List reordered successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateOrderCard } = useAction(updateOrderCard, {
    onSuccess: () => {
      toast.success("Card reordered successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [orderData, setOrderData] = useState(data);

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dropped in the same positon
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user move a list
    if (type === "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderData(items);
      executeUpdateOrderList({ items, boardId });
    }

    // if user move a card
    if (type === "card") {
      let newOrderedData = [...orderData];

      // source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // Chek if cards exist on the sourceList
      if (!sourceList.card) {
        sourceList.card = [];
      }

      // Chek if cards exist on the desList
      if (!destList.card) {
        destList.card = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.card,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.card = reorderedCards;

        setOrderData(newOrderedData);

        executeUpdateOrderCard({ boardId, items: reorderedCards });

        // user move another list
      } else {
        // remove card from source list
        const [movedCard] = sourceList.card.splice(source.index, 1);

        // assign new listId to the moved card
        movedCard.listId = destination.droppableId;

        // add card to the destionation list
        destList.card.splice(destination.index, 0, movedCard);

        sourceList.card.forEach((card, index) => {
          card.order = index;
        });

        // update the order for each card in the destionation list
        destList.card.forEach((card, index) => {
          card.order = index;
        });

        setOrderData(newOrderedData);
        executeUpdateOrderCard({ boardId, items: destList.card });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="pt-5 pl-5 flex gap-x-3 h-full items-center"
          >
            {orderData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

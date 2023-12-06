"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { ListWithCard } from "@/types";
import { cn } from "@/lib/utils";

import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

interface ListItemProps {
  index: number;
  data: ListWithCard;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provider) => (
        <li
          {...provider.draggableProps}
          ref={provider.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provider.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader onAddCard={enableEditing} data={data} />

            <Droppable droppableId={data.id} type="card">
              {(provider) => (
                <ol
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.card.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.card.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} />
                  ))}
                  {provider.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

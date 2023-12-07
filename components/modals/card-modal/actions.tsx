"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { deleteCard } from "@/actions/delete-card";
import { copyCard } from "@/actions/copy-card";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWitchList } from "@/types";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data: CardWitchList;
}

export const Actions = ({ data }: ActionsProps) => {
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} copied`);
        cardModal.onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} deleted`);
        cardModal.onClose();
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const params = useParams();
  const cardModal = useCardModal();

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>

      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

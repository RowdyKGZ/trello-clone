import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ListContainer } from "../_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const list = await db.list.findMany({
    where: { boardId: params.boardId, board: { orgId } },
    include: { card: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="h-full overflow-auto">
      <ListContainer boardId={params.boardId} data={list} />
    </div>
  );
};

export default BoardIdPage;

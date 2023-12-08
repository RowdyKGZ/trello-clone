import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { checkSubcription } from "@/lib/subscription";

import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";

const ActivityPage = async () => {
  const isPro = await checkSubcription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator />

      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;

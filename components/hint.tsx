import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

export const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        side={side}
        className="text-xs max-w-[220px] break-words"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

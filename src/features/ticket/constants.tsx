import {
  LucideCheckCircle2,
  LucideCircleDot,
  LucideCircleEllipsis,
} from "lucide-react";

const TICKETS_ICONS = {
  open: <LucideCircleDot className="text-green-500" />,
  closed: <LucideCheckCircle2 className="text-red-500" />,
  in_progress: <LucideCircleEllipsis className="text-yellow-500" />,
};

export { TICKETS_ICONS };

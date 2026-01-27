import {
  LucideCheckCircle2,
  LucideCircleDot,
  LucideCircleEllipsis,
} from "lucide-react";

export const TICKETS_ICONS = {
  OPEN: <LucideCircleDot className="text-green-500" />,
  CLOSED: <LucideCheckCircle2 className="text-red-500" />,
  IN_PROGRESS: <LucideCircleEllipsis className="text-yellow-500" />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  CLOSED: "Closed",
  IN_PROGRESS: "In Progress",
};

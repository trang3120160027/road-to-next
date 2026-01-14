type TicketStatus = "open" | "closed" | "in_progress";
type TicketPriority = "low" | "medium" | "high";

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
  priority: TicketPriority;
};

export type { Ticket, TicketPriority, TicketStatus };

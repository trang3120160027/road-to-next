import { Ticket } from "./features/ticket/types";

const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Bug in login feature",
    content: "Users are unable to log in using their credentials.",
    status: "open",
    priority: "high",
  },
  {
    id: "2",
    title: "UI enhancement for dashboard",
    content: "Improve the layout and design of the user dashboard.",
    status: "in_progress",
    priority: "medium",
  },
  {
    id: "3",
    title: "Add multi-language support",
    content: "Implement support for multiple languages in the application.",
    status: "closed",
    priority: "low",
  },
];

export { initialTickets };

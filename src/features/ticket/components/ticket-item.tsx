import {
  LucidePen,
  LucideSquareArrowOutUpRight,
  LucideTrash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCents } from "@/utils/currency";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKETS_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="destructive" size="icon">
        <LucideTrash2 />
      </Button>
    </form>
  );

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePen />
      </Link>
    </Button>
  );

  return (
    <div
      className={cn("w-full flex gap-2", isDetail ? "max-w-lg" : "max-w-md")}
    >
      <Card key={ticket.id} className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>{ticket.title}</div>
            <div>{TICKETS_ICONS[ticket.status]}</div>
          </CardTitle>
          <CardDescription>Priority: {ticket.priority}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className={`${!isDetail && "truncate"}`}>{ticket.content}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };

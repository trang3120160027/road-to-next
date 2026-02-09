import { LucidePen, LucideSquareArrowOutUpRight } from "lucide-react";
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
import { Prisma } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCents } from "@/utils/currency";
import { TICKETS_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
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

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePen />
      </Link>
    </Button>
  );

  const moreMenuButton = <TicketMoreMenu ticket={ticket} />;

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
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenuButton}
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

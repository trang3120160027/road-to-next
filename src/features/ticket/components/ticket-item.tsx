import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ticketPath } from "@/paths";
import { TICKETS_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
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
          <p className={`${!isDetail && "truncate"}`}>
            {ticket.content + ticket.content + ticket.content}
          </p>
        </CardContent>
      </Card>

      {isDetail ? null : (
        <div className="flex flex-col gap-1">{detailButton}</div>
      )}
    </div>
  );
};

export { TicketItem };

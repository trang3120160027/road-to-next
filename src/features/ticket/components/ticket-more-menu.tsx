"use client";

import { LucideMoreVertical, LucideTrash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/generated/prisma/client";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

const TicketMoreMenu = ({ ticket }: TicketMoreMenuProps) => {
  const trigger = (
    <Button variant="outline" size="icon">
      <LucideMoreVertical />
    </Button>
  );

  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash2 className="h-4 w-4 text-destructive" />
      <span className="text-destructive">Delete</span>
    </DropdownMenuItem>
  );

  const handleStatusChange = async (newStatus: string) => {
    const toastId = toast.loading("Updating ticket status...");

    const result = await updateTicketStatus(
      ticket.id,
      newStatus as TicketStatus,
    );

    if (result.success) {
      toast.success(result.message, { id: toastId });
    } else {
      toast.error(result.message, { id: toastId });
    }
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleStatusChange}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([status, label]) => (
        <DropdownMenuRadioItem key={status} value={status}>
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ticketStatusRadioGroup}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };

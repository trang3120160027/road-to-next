"use server";

import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form";
import { TicketStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState(true, "Ticket status updated successfully.");
};

export { updateTicketStatus };

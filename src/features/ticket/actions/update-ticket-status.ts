"use server";

import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form";
import { getSessionOrRedirect } from "@/features/auth/queries/get-session-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const updateTicketStatus = async (ticketId: string, status: TicketStatus) => {
  const session = await getSessionOrRedirect();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || !isOwner(session.user, ticket)) {
    return toActionState(false, "Not authorized");
  }

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

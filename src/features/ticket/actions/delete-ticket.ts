"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState, toActionState } from "@/components/form";
import { getSessionOrRedirect } from "@/features/auth/queries/get-session-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const deleteTicket = async (ticketId: string) => {
  const session = await getSessionOrRedirect();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket || !isOwner(session.user, ticket)) {
    return toActionState(false, "Not authorized");
  }

  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toastMessage", "Ticket deleted successfully.");
  redirect(ticketsPath());
};

export { deleteTicket };

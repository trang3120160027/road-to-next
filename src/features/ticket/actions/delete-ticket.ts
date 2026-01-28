"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const deleteTicket = async (ticketId: string) => {
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

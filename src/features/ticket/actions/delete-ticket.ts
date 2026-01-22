"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  revalidatePath(ticketsPath());
  await setCookieByKey("toastMessage", "Ticket deleted successfully.");
  redirect(ticketsPath());
};

export { deleteTicket };

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import prisma from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { UpsertTicketInput, upsertTicketSchema } from "../schemas";

const upsertTicket = async (
  id: string | undefined,
  _prevState: ActionState<UpsertTicketInput>,
  formData: FormData,
) => {
  const values = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const result = upsertTicketSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<UpsertTicketInput>(result.error, values);
  }

  await prisma.ticket.upsert({
    where: { id: id || "" },
    update: result.data,
    create: result.data,
  });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return toActionState<UpsertTicketInput>(true, "Ticket created successfully.");
};

export { upsertTicket };

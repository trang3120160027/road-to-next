"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signInPath, ticketPath, ticketsPath } from "@/paths";
import { toCents } from "@/utils/currency";
import { UpsertTicketInput, upsertTicketSchema } from "../schemas";

const upsertTicket = async (
  id: string | undefined,
  _prevState: ActionState<UpsertTicketInput>,
  formData: FormData,
) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(signInPath());
  }

  const values = Object.fromEntries(formData);

  const result = upsertTicketSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<UpsertTicketInput>(result.error, values);
  }

  const dbData = {
    ...result.data,
    bounty: toCents(result.data.bounty),
    userId: session.user.id,
  };

  try {
    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState<UpsertTicketInput>(error, values);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toastMessage", "Ticket updated successfully.");
    redirect(ticketPath(id));
  }

  return toActionState<UpsertTicketInput>(true, "Ticket created successfully.");
};

export { upsertTicket };

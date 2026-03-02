"use server";

import { revalidatePath } from "next/cache";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import { getSessionOrRedirect } from "@/features/auth/queries/get-session-or-redirect";
import prisma from "@/lib/prisma";
import { ticketPath } from "@/paths";
import { CreateCommentInput, createCommentSchema } from "../schemas";

const createComment = async (
  ticketId: string,
  _prevState: ActionState<CreateCommentInput>,
  formData: FormData,
) => {
  const session = await getSessionOrRedirect();

  const values = Object.fromEntries(formData);

  const result = createCommentSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<CreateCommentInput>(result.error, values);
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        ticketId,
      },
    });
  } catch (error) {
    return fromErrorToActionState<CreateCommentInput>(error, values);
  }

  revalidatePath(ticketPath(ticketId));
  return toActionState<CreateCommentInput>(true, "Comment created");
};

export { createComment };

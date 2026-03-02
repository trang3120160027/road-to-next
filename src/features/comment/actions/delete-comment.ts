"use server";

import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form";
import { getSessionOrRedirect } from "@/features/auth/queries/get-session-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";
import { ticketPath } from "@/paths";

const deleteComment = async (commentId: string) => {
  const session = await getSessionOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment || !isOwner(session.user, comment)) {
    return toActionState(false, "Not authorized");
  }

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(comment.ticketId));
  return toActionState(true, "Comment deleted successfully");
};

export { deleteComment };

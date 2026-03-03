import { getSession } from "@/features/auth/queries/get-session";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";

const getComments = async (ticketId: string) => {
  const session = await getSession();

  if (!session) {
    return [];
  }

  const comments = await prisma.comment.findMany({
    where: { ticketId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(session.user, comment),
  }));
};

export { getComments };

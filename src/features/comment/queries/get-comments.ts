"use server";

import { getSession } from "@/features/auth/queries/get-session";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";

const getComments = async (ticketId: string, cursor?: string) => {
  const session = await getSession();

  const take = 2;
  const where = { ticketId };

  const comments = await prisma.comment.findMany({
    where,
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
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

  const hasNextPage = comments.length > take;
  const slicedComments = hasNextPage ? comments.slice(0, take) : comments;
  const nextCursor = hasNextPage
    ? slicedComments[slicedComments.length - 1].id
    : null;

  return {
    list: slicedComments.map((comment) => ({
      ...comment,
      isOwner: isOwner(session?.user, comment),
    })),
    metadata: {
      hasNextPage,
      nextCursor,
    },
  };
};

export { getComments };

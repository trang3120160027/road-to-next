"use server";

import { getSession } from "@/features/auth/queries/get-session";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";

const getComments = async (ticketId: string, offset?: number) => {
  const session = await getSession();

  const where = { ticketId };
  const skip = offset ?? 0;
  const take = 2;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.comment.count({ where }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(session?.user, comment),
    })),
    metadata: {
      count,
      hasNextPage: skip + take < count,
    },
  };
};

export { getComments };

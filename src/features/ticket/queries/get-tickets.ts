import prisma from "@/lib/prisma";
import { SearchParams } from "../types";

const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
      ...(searchParams.sort === "priority" && { priority: "desc" }),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export { getTickets };

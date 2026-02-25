import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "../types";

const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    orderBy: {
      ...(searchParams.sort === "newest" && { createdAt: "desc" }),
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

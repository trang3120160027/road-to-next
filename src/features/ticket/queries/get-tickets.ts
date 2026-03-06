import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "@/utils/search-params";

const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const take = searchParams.limit;
  const skip = (searchParams.page - 1) * searchParams.limit;

  const [tickets, count] = await prisma.$transaction([
    // Query A: Get the specific page of data
    prisma.ticket.findMany({
      where: where,
      take,
      skip,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    }),

    // Query B: Get the total count of matching records
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: skip + take < count,
    },
  };
};

export { getTickets };

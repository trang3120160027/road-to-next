import prisma from "@/lib/prisma";

const getTickets = async (userId?: string) => {
  return await prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
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

import prisma from "@/lib/prisma";

const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};

export { getTickets };

import prisma from "@/lib/prisma";

const getTicket = async (ticketId: string) => {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
  });
};

export { getTicket };

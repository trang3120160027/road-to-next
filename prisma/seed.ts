import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const users: Prisma.UserCreateManyInput[] = [
  {
    id: "admin-user-id",
    email: "admin@admin.com",
    name: "Admin User",
  },
  {
    id: "user-1-id",
    email: "na851998@gmail.com",
    name: "Anh Nguyen",
  },
];

const tickets: Prisma.TicketCreateManyInput[] = [
  {
    title: "Bug in login feature",
    content: "Users are unable to log in using their credentials.",
    status: "OPEN",
    priority: "HIGH",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 100,
    userId: users[0].id,
  },
  {
    title: "UI enhancement for dashboard",
    content: "Improve the layout and design of the user dashboard.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 50,
    userId: users[1].id,
  },
  {
    title: "Add multi-language support",
    content: "Implement support for multiple languages in the application.",
    status: "CLOSED",
    priority: "LOW",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 75,
    userId: users[0].id,
  },
];

export async function seed() {
  const t0 = performance.now();
  console.log("Start seeding...");

  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users,
  });

  await prisma.ticket.createMany({
    data: tickets,
  });
  const t1 = performance.now();
  console.log(`Seeding finished in ${(t1 - t0).toFixed(2)} ms`);
}

seed();

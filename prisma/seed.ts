import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const users = [
  {
    email: "admin@admin.com",
    name: "admin",
    password: "12345678",
    image: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  {
    email: "na851998@gmail.com",
    name: "Nam Anh",
    password: "12345678",
    image: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
];

export async function seed() {
  const t0 = performance.now();
  console.log("Start seeding...");

  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = [];

  for (const user of users) {
    const result = await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
      },
    });

    if (result?.user) {
      createdUsers.push(result.user);
    }
  }

  if (createdUsers.length === users.length) {
    const tickets: Prisma.TicketCreateManyInput[] = [
      {
        title: "Bug in login feature",
        content: "Users are unable to log in using their credentials.",
        status: "OPEN",
        priority: "HIGH",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 100,
        userId: createdUsers[0].id,
      },
      {
        title: "UI enhancement for dashboard",
        content: "Improve the layout and design of the user dashboard.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 50,
        userId: createdUsers[1].id,
      },
      {
        title: "Add multi-language support",
        content: "Implement support for multiple languages in the application.",
        status: "CLOSED",
        priority: "LOW",
        deadline: new Date().toISOString().split("T")[0],
        bounty: 75,
        userId: createdUsers[0].id,
      },
    ];

    const createdTickets = await prisma.ticket.createManyAndReturn({
      data: tickets,
    });

    if (createdTickets.length > 0) {
      const comments: Prisma.CommentCreateManyInput[] = [
        {
          content: "This is a critical issue, we need to fix it ASAP.",
          ticketId: createdTickets[0].id,
          userId: createdUsers[1].id,
        },
        {
          content: "I can reproduce this bug on Chrome and Firefox.",
          ticketId: createdTickets[0].id,
          userId: createdUsers[0].id,
        },
        {
          content: "Working on it, should have a fix by end of day.",
          ticketId: createdTickets[1].id,
          userId: createdUsers[0].id,
        },
        {
          content: "Multi-language support has been shipped in v2.0.",
          ticketId: createdTickets[2].id,
          userId: createdUsers[1].id,
        },
      ];

      await prisma.comment.createMany({
        data: comments,
      });
    }
  }

  const t1 = performance.now();
  console.log(`Seeding finished in ${(t1 - t0).toFixed(2)} ms`);
}

seed();

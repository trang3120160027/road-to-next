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

    await prisma.ticket.createMany({
      data: tickets,
    });
  }

  const t1 = performance.now();
  console.log(`Seeding finished in ${(t1 - t0).toFixed(2)} ms`);
}

seed();

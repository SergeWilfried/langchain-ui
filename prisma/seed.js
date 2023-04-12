import { PrismaClient } from "@prisma/client";
const prisma = require("@prisma/client");
if (require.main === module) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info("Seeding database...");

  const client = new prisma.PrismaClient();
  console.info("Seeding database with defaults plugins...");

  const plugins = {};

  console.info("Seeding database with defaults datastores...");

  const datastores = {};

  const data = {};

  await client.user.upsert({
    where: {
      username: data.username,
    },

    update: {},
    create: data,
  });

  void client.$disconnect();

  console.info("Seeded database successfully");
}

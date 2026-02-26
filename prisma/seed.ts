import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  const embedToken = randomBytes(32).toString("hex");

  await prisma.admin.upsert({
    where: { id: "admin" },
    update: { passwordHash, embedToken },
    create: {
      id: "admin",
      passwordHash,
      embedToken,
    },
  });

  console.log("Admin user created/updated with password: admin123");
  console.log("Embed token:", embedToken);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

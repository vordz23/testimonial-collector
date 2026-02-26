import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: { id: "admin" },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    const embedToken = randomBytes(32).toString("hex");

    await prisma.admin.create({
      data: {
        id: "admin",
        passwordHash,
        embedToken,
      },
    });

    console.log("Admin user created with password: admin123");
    console.log("Embed token:", embedToken);
  } else {
    console.log("Admin already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

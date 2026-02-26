import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function setup() {
  "use server";
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

  redirect("/admin");
}

export default async function SetupPage() {
  await setup();
  return null;
}

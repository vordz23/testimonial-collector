import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
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

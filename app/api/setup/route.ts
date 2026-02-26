import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const passwordHash = await bcrypt.hash("admin123", 10);
    const embedToken = randomBytes(32).toString("hex");

    const admin = await prisma.admin.upsert({
      where: { id: "admin" },
      update: { passwordHash, embedToken },
      create: {
        id: "admin",
        passwordHash,
        embedToken,
      },
    });

    return NextResponse.json({ success: true, embedToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}

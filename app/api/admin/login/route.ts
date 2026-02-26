import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  const body = await request.json();
  const { password } = body;

  const admin = await prisma.admin.findUnique({
    where: { id: "admin" },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ success: true });
}

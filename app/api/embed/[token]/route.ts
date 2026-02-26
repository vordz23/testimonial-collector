import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const admin = await prisma.admin.findFirst({
    where: { embedToken: params.token },
  });

  if (!admin) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const testimonials = await prisma.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    select: {
      clientName: true,
      company: true,
      rating: true,
      text: true,
      createdAt: true,
    },
  });

  return NextResponse.json(testimonials);
}

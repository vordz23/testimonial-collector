import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { testimonialSchema } from "@/lib/validations";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = testimonialSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400 }
    );
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      clientName: result.data.clientName,
      clientEmail: result.data.clientEmail || null,
      company: result.data.company || null,
      rating: result.data.rating,
      text: result.data.text,
    },
  });

  return NextResponse.json(testimonial, { status: 201 });
}

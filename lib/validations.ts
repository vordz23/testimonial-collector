import { z } from "zod";

export const testimonialSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, "Testimonial must be at least 10 characters"),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

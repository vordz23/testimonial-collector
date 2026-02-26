import { prisma } from "@/lib/db";
import AdminTable from "@/components/AdminTable";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Testimonials Dashboard</h1>
          <div className="flex gap-3">
            <a
              href="/admin/widget"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Embed Code
            </a>
            <LogoutButton />
          </div>
        </div>
        <AdminTable testimonials={testimonials} />
      </div>
    </main>
  );
}

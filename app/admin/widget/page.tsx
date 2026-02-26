import { prisma } from "@/lib/db";
import { EmbedCode } from "@/components/EmbedCode";

export const dynamic = "force-dynamic";

export default async function WidgetPage() {
  const admin = await prisma.admin.findUnique({
    where: { id: "admin" },
  });

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Embed Widget</h1>
          <a
            href="/admin/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </a>
        </div>
        <EmbedCode embedToken={admin.embedToken} />
      </div>
    </main>
  );
}

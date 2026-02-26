"use client";

import { Star, Check, X, Trash2 } from "lucide-react";
import { useState } from "react";

type Testimonial = {
  id: string;
  clientName: string;
  clientEmail: string | null;
  company: string | null;
  rating: number;
  text: string;
  status: string;
  createdAt: Date;
};

export default function AdminTable({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setTestimonials(
        testimonials.map((t) => (t.id === id ? { ...t, status } : t))
      );
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const statusBadge = (status: string) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    };
    return (
      <span className={"px-2 py-1 rounded-full text-xs font-medium " + styles[status as keyof typeof styles]}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Client</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Rating</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Testimonial</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{t.clientName}</div>
                  {t.company && <div className="text-sm text-gray-500">{t.company}</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={"w-4 h-4 " + (star <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 max-w-md">
                  <p className="text-sm text-gray-700 line-clamp-2">{t.text}</p>
                </td>
                <td className="px-4 py-3">{statusBadge(t.status)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {t.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateStatus(t.id, "APPROVED")}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => updateStatus(t.id, "REJECTED")}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No testimonials yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

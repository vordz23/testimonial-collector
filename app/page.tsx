import TestimonialForm from "@/components/TestimonialForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Share Your Experience</h1>
          <p className="text-gray-600">We would love to hear your feedback!</p>
        </div>
        <TestimonialForm />
      </div>
    </main>
  );
}

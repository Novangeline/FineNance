'use client';

import ViewByMonth from "@/components/ViewByMonth";

export default function ViewByMonthPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-soft">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        View by Month 📅
      </h1>
      <ViewByMonth />
    </div>
  );
}
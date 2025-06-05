'use client';

import ViewByYear from '@/components/ViewByYear';

export default function ViewByYearPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-soft rounded-2xl">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        View Spendings by Year 📆
      </h1>
      <ViewByYear />
    </div>
  );
}

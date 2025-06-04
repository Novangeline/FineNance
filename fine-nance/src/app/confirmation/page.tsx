'use client';

import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-soft mt-20 text-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Spending Added 🎉</h1>
      <p className="text-gray-600 mb-6">What would you like to do next?</p>

      <div className="flex flex-col gap-4">
        <Link
          href="/add"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          ➕ Add Another Spending
        </Link>
        <Link
          href="/view"
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
        >
          📊 View Spendings
        </Link>
      </div>
    </div>
  );
}
"use client";

import type { Spending } from "@/types";

type Props = {
  spending: Spending[];
};

export default function ViewSpending({ spending }: Props) {
  const total = spending.reduce((sum, item) => sum + item.cost, 0);

  if (spending.length === 0)
    return <p className="text-center text-gray-500">No spending yet</p>;

  return (
    <div className="space-y-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-100 text-blue-700">
            <th className="p-2">Date</th>
            <th className="p-2">Name</th>
            <th className="p-2">Cost</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {spending.map((item, index) => (
            <tr key={index} className="even:bg-blue-50">
              <td className="p-2">
                {new Date(item.date).toLocaleDateString("en-AU")}
              </td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">${item.cost.toFixed(2)}</td>
              <td className="p-2">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-right text-blue-600 font-semibold">
        Total Spent: ${total.toFixed(2)}
      </h3>
    </div>
  );
}

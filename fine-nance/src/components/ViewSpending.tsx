"use client";

import { useState } from "react";
import type { Spending } from "@/types";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

type Props = {
  spending: Spending[];
  onDelete?: (id: string) => void;
  onUpdate?: (item: Spending) => void;
};

export default function ViewSpending({ spending, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Spending>>({});

  const total = spending.reduce((sum, item) => sum + item.cost, 0);

  const startEdit = (item: Spending) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onUpdate && editingId) {
      onUpdate({
        ...(editForm as Spending),
        cost: parseFloat(editForm.cost?.toString() || "0"),
      });
    }
    setEditingId(null);
  };

  if (spending.length === 0)
    return <p className="text-center text-gray-500">No spending yet</p>;

  return (
    <div className="space-y-4">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-blue-100 text-blue-700 text-sm rounded">
            <th className="p-3 text-left rounded-l-xl">Date</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Cost</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-center rounded-r-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spending.map((item) => (
            <tr
              key={item.id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-xl"
            >
              {editingId === item.id ? (
                <>
                  <td className="p-3">
                    <input
                      type="date"
                      name="date"
                      value={editForm.date?.toString() || ""}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      name="name"
                      value={editForm.name || ""}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      name="cost"
                      value={editForm.cost?.toString() || ""}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      name="category"
                      value={editForm.category || ""}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Bills">Bills</option>
                      <option value="Others">Others</option>
                    </select>
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button onClick={handleSave} title="Save">
                      <FiSave className="text-green-600 hover:text-green-700 transition text-lg" />
                    </button>
                    <button onClick={cancelEdit} title="Cancel">
                      <FiX className="text-gray-500 hover:text-gray-700 transition text-lg" />
                    </button>
                    <button onClick={() => onDelete?.(item.id)} title="Delete">
                      <FiTrash2 className="text-red-500 hover:text-red-600 transition text-lg" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-3">
                    {new Date(item.date).toLocaleDateString("en-AU")}
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">${item.cost.toFixed(2)}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => startEdit(item)} title="Edit">
                      <FiEdit2 className="text-blue-500 hover:text-blue-700 transition text-lg" />
                    </button>
                  </td>
                </>
              )}
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

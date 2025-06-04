'use client';

import { useState } from 'react';
import type { NewSpending } from '@/types';

type Props = {
  onAdd: (item: NewSpending) => void;
};

export default function AddSpending({ onAdd }: Props) {
  const [form, setForm] = useState({
    date: '',
    name: '',
    cost: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.name || !form.cost || !form.category) return;
    onAdd({ ...form, cost: parseFloat(form.cost) });
    setForm({ date: '', name: '', cost: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border border-blue-200 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border border-blue-200 rounded"
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={form.cost}
          onChange={handleChange}
          className="p-2 border border-blue-200 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border border-blue-200 rounded"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Spending
      </button>
    </form>
  );
}
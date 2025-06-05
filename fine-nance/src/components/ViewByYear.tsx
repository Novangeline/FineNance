'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Spending } from '@/types';

export default function ViewByYear() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYearlySpendings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('spendings')
        .select('*')
        .gte('date', `${year}-01-01`)
        .lte('date', `${year}-12-31`)
        .order('date', { ascending: true });

      if (!error && data) {
        setSpendings(data as Spending[]);
      }
      setLoading(false);
    };

    fetchYearlySpendings();
  }, [year]);

  const total = spendings.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <label htmlFor="year" className="font-medium text-blue-600">
          Select Year:
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border p-2 rounded text-blue-700"
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : spendings.length === 0 ? (
        <p className="text-center text-gray-500">No spendings found for {year}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Cost</th>
                <th className="p-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {spendings.map((item, idx) => (
                <tr key={idx} className="even:bg-blue-50">
                  <td className="p-2">{new Date(item.date).toLocaleDateString('en-AU')}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">${item.cost.toFixed(2)}</td>
                  <td className="p-2">{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-right mt-4 text-blue-600 font-semibold">
            Total Spent: ${total.toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
}
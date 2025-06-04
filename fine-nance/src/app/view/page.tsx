'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ViewSpending from '@/components/ViewSpending';
import type { Spending } from '@/types';

export default function ViewPage() {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);

  // Fetch spendings on mount
  useEffect(() => {
    const fetchSpendings = async () => {
      const { data, error } = await supabase
        .from('spendings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSpendingList(data as Spending[]);
      }
    };

    fetchSpendings();

    // ✅ Set up real-time listener
    const subscription = supabase
      .channel('realtime-spendings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'spendings',
        },
        (payload) => {
          const newItem = payload.new as Spending;
          setSpendingList((prev) => [newItem, ...prev]);
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        View Spendings 📊
      </h1>
      <ViewSpending spending={spendingList} />
    </div>
  );
}
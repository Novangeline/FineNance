"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ViewSpending from "@/components/ViewSpending";
import type { Spending } from "@/types";

export default function ViewPage() {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "chart">("all");

  useEffect(() => {
    const fetchSpendings = async () => {
      const { data, error } = await supabase
        .from("spendings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSpendingList(data as Spending[]);
      }
    };

    fetchSpendings();

    const subscription = supabase
      .channel("realtime-spendings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "spendings",
        },
        (payload) => {
          const newItem = payload.new as Spending;
          setSpendingList((prev) => [newItem, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const deleteSpending = async (id: string) => {
    const { error } = await supabase.from("spendings").delete().eq("id", id);
    if (error) {
      console.error("Delete failed:", error.message);
      return;
    }
    setSpendingList((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSpending = async (item: Spending) => {
    const { error } = await supabase
      .from("spendings")
      .update({
        date: item.date,
        name: item.name,
        cost: item.cost,
        category: item.category,
      })
      .eq("id", item.id);

    if (error) {
      console.error("Update failed:", error.message);
      return;
    }

    setSpendingList((prev) =>
      prev.map((sp) => (sp.id === item.id ? item : sp))
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        View Spendings 📊
      </h1>

      {/* 🔹 Tabs */}
      <div className="flex justify-center mb-4 gap-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          View All
        </button>
        <button
          onClick={() => setActiveTab("chart")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "chart"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          View Chart 📈
        </button>
      </div>

      {/* 🔹 Tab content */}
      {activeTab === "all" && (
        <ViewSpending
          spending={spendingList}
          onDelete={deleteSpending}
          onUpdate={updateSpending}
        />
      )}

      {activeTab === "chart" && (
        <div className="text-center text-gray-500 mt-8">
          🚧 Chart coming soon! Get ready for some cool visual insights 🎉
        </div>
      )}
    </div>
  );
}
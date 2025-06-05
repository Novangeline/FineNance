"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ViewSpending from "@/components/ViewSpending";
import type { Spending } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function ViewPage() {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "month">("all");
  const [selectedMonth, setSelectedMonth] = useState(dayjs()); // default: current month
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Fetch spendings on mount
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

    // ✅ Set up real-time listener
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

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // ✅ Delete spending
  const deleteSpending = async (id: string) => {
    const { error } = await supabase.from("spendings").delete().eq("id", id);
    if (error) {
      console.error("Delete failed:", error.message);
      return;
    }
    setSpendingList((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update spending
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

      {/* 🔹 INSERT THE TABS BUTTONS HERE */}
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
          onClick={() => setActiveTab("month")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          View by Month
        </button>
      </div>

      {/* 🔹 CONDITIONAL DISPLAY */}
      {activeTab === "all" && (
        <ViewSpending
          spending={spendingList}
          onDelete={deleteSpending}
          onUpdate={updateSpending}
        />
      )}

      {activeTab === "month" && (
        <>
          {/* 🟦 Month Bubble */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsPickerOpen((prev) => !prev)}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full shadow text-sm hover:bg-blue-200 transition"
            >
              {selectedMonth.format("MMMM YYYY")}
            </button>
          </div>

          {/* 📅 Date Picker */}
          {isPickerOpen && (
            <div className="flex justify-center mb-6">
              <DatePicker
                selected={selectedMonth.toDate()}
                onChange={(date) => {
                  setSelectedMonth(dayjs(date));
                  setIsPickerOpen(false);
                }}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                className="border p-2 rounded-lg text-center text-blue-700 font-medium shadow-sm w-[150px] cursor-pointer"
              />
            </div>
          )}
          
          {/* Filtered spendings by selectedMonth */}
          <ViewSpending
            spending={spendingList.filter((item) =>
              dayjs(item.date).isSame(selectedMonth, "month")
            )}
          />
        </>
      )}
    </div>
  );
}

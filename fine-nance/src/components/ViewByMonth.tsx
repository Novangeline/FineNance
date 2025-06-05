"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Spending } from "@/types";
import ViewSpending from "@/components/ViewSpending";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function ViewByMonthPage() {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft mt-10">

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

      {/* Filtered spendings */}
      <ViewSpending
        spending={spendingList.filter((item) =>
          dayjs(item.date).isSame(selectedMonth, "month")
        )}
      />
    </div>
  );
}
"use client";
    
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AddSpending from "@/components/AddSpending";
import type { NewSpending } from "@/types";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const addSpending = async (item: NewSpending) => {
    const { error } = await supabase.from("spendings").insert([item]);

    if (!error) {
      router.push("/confirmation");
    } else {
      console.error("Insert error:", error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Add Spending 💰
      </h1>
      <AddSpending onAdd={addSpending} />
      <p className="text-center text-sm text-gray-500 mt-2">{status}</p>
    </div>
  );
}

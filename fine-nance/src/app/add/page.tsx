"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AddSpending from "@/components/AddSpending";
import type { NewSpending } from "@/types";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSpending = async (item: NewSpending) => {
    setIsSubmitting(true); // show splash

    const { error } = await supabase.from("spendings").insert([item]);

    if (!error) {
      setTimeout(() => {
        router.push("/confirmation");
      }, 1500); // wait for splash before redirect
    } else {
      console.error("Insert error:", error.message);
      setIsSubmitting(false); // revert splash if error
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <p className="text-xl font-semibold text-blue-600 mb-4">
            Adding Spending...
          </p>
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-soft mt-10">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Add Spending 💰
      </h1>
      <AddSpending onAdd={addSpending} />
    </div>
  );
}

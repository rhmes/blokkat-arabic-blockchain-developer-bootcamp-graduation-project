// components/PayProductForm.tsx
"use client";
import React from "react";
import { useTheme } from "next-themes";

export default function PayProductForm({ productId, setProductId, handlePay, loading }: any) {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 space-y-4 border
        ${resolvedTheme === "dark"
          ? "bg-gray-800 text-gray-100 border-gray-700"
          : "bg-white/90 text-gray-900 border-indigo-100"}
      `}
    >
      <h2 className={`text-xl font-bold ${resolvedTheme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>Pay for Product</h2>
      <input
        className={`border rounded-xl px-3 py-2 w-full transition placeholder-gray-400 dark:placeholder-gray-500
          ${resolvedTheme === "dark"
            ? "border-gray-700 focus:ring-indigo-900 bg-gray-900 text-gray-100 focus:border-indigo-500 focus:ring-2"
            : "border-indigo-300 focus:ring-indigo-200 bg-white text-gray-900 focus:border-indigo-500 focus:ring-2"}
        `}
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        type="number"
        min={0}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className={`font-semibold px-4 py-2 rounded-xl shadow transition disabled:opacity-50 focus:outline-none focus:ring-2
          ${resolvedTheme === "dark"
            ? "bg-gradient-to-r from-green-700 to-emerald-800 text-white focus:ring-emerald-900"
            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-300"}
        `}
      >
        {loading ? "Paying..." : "Pay"}
      </button>
    </div>
  );
}

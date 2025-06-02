// components/PayProductForm.tsx
"use client";
import React from "react";

export default function PayProductForm({ productId, setProductId, handlePay, loading }: any) {
  return (
    <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 space-y-4 border border-indigo-100 dark:border-gray-700">
      <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Pay for Product</h2>
      <input
        className="border border-indigo-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl px-3 py-2 w-full transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        type="number"
        min={0}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-xl shadow transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-emerald-900"
      >
        {loading ? "Paying..." : "Pay"}
      </button>
    </div>
  );
}

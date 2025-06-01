// components/PayProductForm.tsx
"use client";
import React from "react";

export default function PayProductForm({ productId, setProductId, handlePay, loading }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-indigo-600">Pay for Product</h2>
      <input
        className="border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded px-3 py-2 w-full transition"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        type="number"
        min={0}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition disabled:opacity-50"
      >
        {loading ? "Paying..." : "Pay"}
      </button>
    </div>
  );
}

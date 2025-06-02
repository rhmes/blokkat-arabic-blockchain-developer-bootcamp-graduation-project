// components/AddProductForm.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function AddProductForm({ name, price, setName, setPrice, handleAdd }: any) {
  const { resolvedTheme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 space-y-4 border
        ${resolvedTheme === "dark"
          ? "bg-gray-800 text-gray-100 border-gray-700"
          : "bg-white/90 text-gray-900 border-indigo-100"}
      `}
    >
      <h2 className={`text-xl font-bold ${resolvedTheme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>Add Product</h2>
      <input
        className={`border rounded-xl px-3 py-2 w-full transition placeholder-gray-400 dark:placeholder-gray-500
          ${resolvedTheme === "dark"
            ? "border-gray-700 focus:ring-indigo-900 bg-gray-900 text-gray-100 focus:border-indigo-500 focus:ring-2"
            : "border-indigo-300 focus:ring-indigo-200 bg-white text-gray-900 focus:border-indigo-500 focus:ring-2"}
        `}
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={`border rounded-xl px-3 py-2 w-full transition placeholder-gray-400 dark:placeholder-gray-500
          ${resolvedTheme === "dark"
            ? "border-gray-700 focus:ring-indigo-900 bg-gray-900 text-gray-100 focus:border-indigo-500 focus:ring-2"
            : "border-indigo-300 focus:ring-indigo-200 bg-white text-gray-900 focus:border-indigo-500 focus:ring-2"}
        `}
        placeholder="Price in USD (e.g., 29.99)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className={`font-semibold px-4 py-2 rounded-xl shadow transition disabled:opacity-50 focus:outline-none focus:ring-2
          ${resolvedTheme === "dark"
            ? "bg-gradient-to-r from-indigo-500 to-purple-800 text-white focus:ring-purple-00"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-300"}
        `}
      >
        Add Product
      </button>
    </motion.div>
  );
}

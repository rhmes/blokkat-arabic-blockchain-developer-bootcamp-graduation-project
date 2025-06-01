// components/AddProductForm.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AddProductForm({ name, price, setName, setPrice, handleAdd }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-indigo-600">Add Product</h2>
      <input
        className="border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded px-3 py-2 w-full transition dark:bg-gray-800 dark:border-gray-600"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded px-3 py-2 w-full transition dark:bg-gray-800 dark:border-gray-600"
        placeholder="Price in USD (e.g., 29.99)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow transition"
      >
        Add Product
      </button>
    </motion.div>
  );
}

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
      className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 space-y-4 border border-indigo-100 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300">Add Product</h2>
      <input
        className="border border-indigo-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl px-3 py-2 w-full transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-indigo-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 rounded-xl px-3 py-2 w-full transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Price in USD (e.g., 29.99)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl shadow transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-purple-900"
      >
        Add Product
      </button>
    </motion.div>
  );
}

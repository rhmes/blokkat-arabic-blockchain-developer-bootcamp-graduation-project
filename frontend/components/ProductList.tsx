// components/ProductList.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ProductList({ products }: any) {
  if (!products.length) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow p-4 text-center text-gray-400">
        No products available.
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      {products.map((p: any) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: p.id * 0.03 }}
          className="flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-indigo-100 dark:border-gray-800 rounded px-3 py-2 shadow-sm"
        >
          <span className="font-semibold text-xs text-gray-500 dark:text-gray-400 mr-3">
            {p.id}
          </span>
          <span className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-2" />
          <span className="font-semibold flex-1 truncate">{p.name}</span>
          <span className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-2" />
          <span className="font-mono text-sm">
            ${Number(p.priceUSD) / 100}
          </span>
          <span className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-2" />
          <span className="font-mono text-xs text-indigo-600 dark:text-indigo-300">
            Ξ{Number(p.priceETH) / 1e18}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

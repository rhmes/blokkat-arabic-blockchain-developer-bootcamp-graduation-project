// components/ProductList.tsx
"use client";
import { motion } from "framer-motion";

export default function ProductList({ products }: any) {
  if (!products.length) {
    return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow p-4 text-center text-gray-400 dark:text-gray-500">
        No products available.
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {products.map((p: any) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: p.id * 0.03 }}
          className="flex items-center bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-indigo-100 dark:border-gray-700 rounded-3xl px-5 py-2 shadow-md hover:shadow-lg transition-shadow duration-200 group min-h-[44px]"
        >
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 mr-4 bg-indigo-50 dark:bg-indigo-900 rounded-full px-2 py-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800 transition">
            {p.id}
          </span>
          <span className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-3" />
          <span className="text-l flex-1 truncate text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition">
            {p.name}
          </span>
          <span className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-3" />
          <span className="font-mono text-base text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 mr-2">
            ${Number(p.priceUSD) / 100}
          </span>
          <span className="font-mono text-xs text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900 rounded px-2 py-1">
            Ξ{Number(p.priceETH) / 1e18}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// components/ProductList.tsx
"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ProductList({ products }: any) {
  const { resolvedTheme } = useTheme();
  if (!products.length) {
    return (
      <div
        className={`rounded-2xl shadow p-4 text-center transition-colors duration-200
        ${resolvedTheme === "dark" ? "bg-gray-900 text-gray-100 text-gray-500" : "bg-white text-gray-900 text-gray-400"}`}
      >
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
          className={`flex items-center border rounded-3xl px-5 py-2 shadow-md hover:shadow-lg transition-shadow duration-200 group min-h-[44px] transition-colors
            ${resolvedTheme === "dark" ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white/90 text-gray-900 border-indigo-100"}`}
        >
          <span className={`text-xs font-bold mr-4 rounded-full px-2 py-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800 transition
            ${resolvedTheme === "dark" ? "text-indigo-300 bg-indigo-900" : "text-indigo-600 bg-indigo-50"}`}>{p.id}</span>
          <span className={`w-px h-6 mx-3 ${resolvedTheme === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
          <span className={`flex-1 truncate text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-200 transition`}>{p.name}</span>
          <span className={`w-px h-6 mx-3 ${resolvedTheme === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
          <span className={`font-mono text-base rounded px-2 py-1 mr-2
            ${resolvedTheme === "dark" ? "text-gray-200 bg-gray-700" : "text-gray-700 bg-gray-100"}`}>${Number(p.priceUSD) / 100}</span>
          <span className={`font-mono text-xs rounded px-2 py-1
            ${resolvedTheme === "dark" ? "text-indigo-300 bg-indigo-900" : "text-indigo-600 bg-indigo-50"}`}>Ξ{Number(p.priceETH) / 1e18}</span>
        </motion.div>
      ))}
    </div>
  );
}

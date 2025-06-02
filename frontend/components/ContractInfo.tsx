'use client'

import React from "react"
import { useTheme } from 'next-themes';

export default function ContractInfo({ ethUsd, balance }: any) {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-3 border flex flex-col gap-1
      ${resolvedTheme === "dark"
        ? "bg-gray-800 text-gray-100 border-gray-700"
        : "bg-gray-50/80 text-gray-900 border-gray-200"}
    `}>
      
      {/* ETH/USD Price */}
      <div className="flex items-center gap-1 min-h-[28px]">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z"/>
          </svg>
        </span>
        <span className={`font-semibold font-sans text-sm tracking-wide ${resolvedTheme === "dark" ? "text-indigo-200" : "text-gray-500"}`}>
          ETH/USD Price
        </span>
        <span className={`ml-auto font-mono text-xs rounded-full px-2 py-0.5 ${resolvedTheme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
          {ethUsd 
            ? `$ ${Number(ethUsd) / 1e18}` 
            : <span className={`italic ${resolvedTheme === "dark" ? "text-indigo-200" : "text-gray-400"}`}>Loading...</span>}
        </span>
      </div>

      {/* Contract Balance */}
      <div className="flex items-center gap-1 min-h-[28px]">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z"/>
          </svg>
        </span>
        <span className={`font-semibold font-sans text-sm tracking-wide ${resolvedTheme === "dark" ? "text-indigo-200" : "text-gray-400"}`}>
          Contract Balance
        </span>
        <span className={`ml-auto font-mono text-xs rounded-full px-2 py-0.5 ${resolvedTheme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
          {balance 
            ? `${Number(balance) / 1e18} ETH` 
            : <span className={`italic ${resolvedTheme === "dark" ? "text-indigo-200" : "text-gray-400"}`}>Loading...</span>}
        </span>
      </div>
    </div>
  )
}

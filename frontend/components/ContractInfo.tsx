// components/ContractInfo.tsx
import React from "react";

export default function ContractInfo({ ethUsd, balance }: any) {
  return (
    <div className="bg-gray-50/80 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-200 p-3 border border-gray-200 dark:border-gray-700 flex flex-col gap-1">
      <div className="flex items-center gap-1 min-h-[28px]">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z"/></svg>
        </span>
        <span className="font-semibold font-sans text-s tracking-wide text-gray-500 dark:text-indigo-200">ETH/USD Price</span>
        <span className="ml-auto font-mono text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5">
          $ {ethUsd ? Number(ethUsd) / 1e18 : <span className='italic text-gray-400 dark:text-indigo-200'>Loading...</span>}
        </span>
      </div>
      <div className="flex items-center gap-1 min-h-[28px]">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z"/></svg>
        </span>
        <span className="font-semibold font-sans text-s tracking-wide text-gray-400 dark:text-indigo-200">Contract Balance</span>
        <span className="ml-auto font-mono text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5">
          {balance ? `${Number(balance) / 1e18} ETH` : <span className='italic text-gray-400'>Loading...</span>}
        </span>
      </div>
    </div>
  );
}

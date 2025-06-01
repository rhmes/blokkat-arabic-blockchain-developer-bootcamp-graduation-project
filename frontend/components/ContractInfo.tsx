// components/ContractInfo.tsx
import React from "react";

export default function ContractInfo({ ethUsd, balance }: any) {
  return (
    <div className="bg-indigo-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-4 shadow flex flex-col gap-2">
      <p>
        <span className="font-semibold">ETH/USD Price:</span>{" "}
        {ethUsd ? <span className="font-mono">{Number(ethUsd) / 1e18}</span> : "Loading..."}
      </p>
      <p>
        <span className="font-semibold">Contract Balance:</span>{" "}
        {balance ? <span className="font-mono">{Number(balance) / 1e18} ETH</span> : "Loading..."}
      </p>
    </div>
  );
}

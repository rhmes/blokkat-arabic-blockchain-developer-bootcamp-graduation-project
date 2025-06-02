import { motion } from "framer-motion";
import { useTheme } from 'next-themes';

// import ThemeToggle from "./ThemeToggle";

export default function WalletSection() {
  const { resolvedTheme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded px-2 py-2 justify-center transition-colors duration-200
        ${resolvedTheme === "dark"
          ? "bg-gray-800 text-gray-100 border-gray-800"
          : "bg-white text-gray-900 border-gray-200"}
      `}
    >
      <div className={`flex gap-2 rounded-2xl shadow-lg px-6 justify-center transition-colors duration-200
        ${resolvedTheme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-indigo-50 text-gray-900"}
      `}>
        <w3m-button />
        <w3m-network-button />
      </div>
    </motion.div>
  );
}
// This component is a simple wallet section that includes buttons for connecting to a wallet and switching networks.
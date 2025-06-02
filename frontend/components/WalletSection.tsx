import { motion } from "framer-motion";
// import ThemeToggle from "./ThemeToggle";

export default function WalletSection() {
  return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 dark:border-gray-800 rounded px-2 py-2 justify-center"
      >
      <div className="flex  gap-2 bg-indigo-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg px-6 justify-center ">
        <w3m-button />
        <w3m-network-button />
      </div>
    </motion.div>
  );
}
// This component is a simple wallet section that includes buttons for connecting to a wallet and switching networks.
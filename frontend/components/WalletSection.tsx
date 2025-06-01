export default function WalletSection() {
  return (
    <div className="flex items-center gap-4 bg-indigo-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg px-6 py-4 mb-8">
      <w3m-button />
      <w3m-network-button />
    </div>
  );
}
// This component is a simple wallet section that includes buttons for connecting to a wallet and switching networks.
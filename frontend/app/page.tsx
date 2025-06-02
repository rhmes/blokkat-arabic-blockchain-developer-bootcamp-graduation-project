"use client";
import React, { useEffect, useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
  usePublicClient,
} from "wagmi";
import { motion } from "framer-motion";
import abi from "../abi/USDStore.abi.json";
import AddProductForm from "@/components/AddProductForm";
import PayProductForm from "@/components/PayProductForm";
import ProductList from "@/components/ProductList";
import ContractInfo from "@/components/ContractInfo";
import ThemeToggle from "@/components/ThemeToggle";
import WalletSection from "@/components/WalletSection";
import { useTheme } from 'next-themes';

export default function Home() {
  const usdStoreContract = {
    address: "0x931aD472B5E0C2D7C56666bfb6e5E29A8EBeA40B",
    abi: abi,
    chainId: 534351, // Scroll Sepolia
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState([]);

  const publicClient = usePublicClient();

  const { data: productCount, refetch: refetchProductCount } = useReadContract({
    ...usdStoreContract,
    functionName: "productCount",
  });

  const { data: priceInETH, refetch: refetchETHPrice } = useReadContract({
    ...usdStoreContract,
    functionName: "getPriceInETH",
    args: [productId],
    watch: true,
  });

  const { data: balance, refetch: refetchBalanceFn } = useReadContract({
    ...usdStoreContract,
    functionName: "getBalance",
  });

  const { data: ethUsd, refetch: refetchEthUsd } = useReadContract({
    ...usdStoreContract,
    functionName: "getLatestETHUSD",
  });

  const { writeContract } = useWriteContract();

  useWatchContractEvent({
    ...usdStoreContract,
    eventName: "ProductAdded",
    listener: () => {
      refetchEthUsd();
      refetchETHPrice();
      refetchProductCount();
      fetchAllProducts();
    },
  });

  const fetchAllProducts = async () => {
    if (!productCount) return;
    const count = Number(productCount);
    const fetched = [];
    for (let i = 0; i < count; i++) {
      try {
        const p = await publicClient.readContract({
          ...usdStoreContract,
          functionName: "products",
          args: [i],
        });

        if (!p || !p[2]) continue;

        let p_inETH = 0;
        try {
          p_inETH = await publicClient.readContract({
            ...usdStoreContract,
            functionName: "getPriceInETH",
            args: [i],
          });
        } catch (err) {
          console.warn("Error fetching price in ETH for product", i, err);
        }

        fetched.push({ id: i, priceUSD: p[0], name: p[1], priceETH: p_inETH });
      } catch (err) {
        continue;
      }
    }
    setProducts(fetched);
  };

  useEffect(() => {
    if (productCount) fetchAllProducts();
  }, [productCount]);

  const handleAdd = async () => {
    if (!name || !price || isNaN(Number(price))) {
      alert("Please enter a valid product name and price.");
      return;
    }
    await writeContract({
      ...usdStoreContract,
      functionName: "addProduct",
      args: [name, Math.round(parseFloat(price) * 100)],
    });
    fetchAllProducts();
    refetchBalanceFn();
    refetchETHPrice();
  };

  const handlePay = async () => {
    if (productId === undefined || productId === null || isNaN(Number(productId))) {
      alert("Please enter a valid product ID.");
      return;
    }
    if (!priceInETH) {
      alert("ETH price not loaded.");
      return;
    }
    await writeContract({
      ...usdStoreContract,
      functionName: "payForProduct",
      args: [productId],
      value: priceInETH as bigint,
    });
    fetchAllProducts();
    refetchBalanceFn();
    refetchETHPrice();
  };

  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen ${resolvedTheme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"}`} suppressHydrationWarning>
      <div className="h md:h-4" />
      <motion.div
        className={`flex items-center justify-center gap-4 mt-8 ${resolvedTheme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ThemeToggle />
      </motion.div>
      <motion.div
        className={`flex items-center justify-center gap-4 mt-8 ${resolvedTheme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-3xl md:text-4xl font-extrabold ${resolvedTheme === "dark" ? "text-indigo-300" : "text-indigo-700"} text-center drop-shadow-lg m-0 flex items-center`}>
          USD Store DApp
        </h1>
      </motion.div>
      <motion.div
        className={`flex items-center justify-center gap-4 mt-3 mb-10 ${resolvedTheme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg flex items-center gap-2">
          <span role="img" aria-label="store">🛒</span>
          Decentralized <span className={`font-semibold ${resolvedTheme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>USD/ETH Store</span>
          <span className="hidden md:inline">&mdash; Powered by</span>
          <span className={`ml-1 font-mono text-xs px-2 py-1 rounded ${resolvedTheme === "dark" ? "bg-indigo-900" : "bg-indigo-100"}`}>
            Scroll Sepolia
          </span>
        </h3>
      </motion.div>
      <motion.div
        className={`max-w-5xl mx-auto flex flex-col md:flex-row gap-8 rounded-3xl shadow-lg p-6 ${resolvedTheme === "dark" ? "bg-gray-900" : "bg-white"}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left side: WalletSection, ProductList and ContractInfo */}
        <motion.div
          className={`flex-1 flex flex-col gap-6 order-2 md:order-2 rounded-3xl p-6 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-white"}`}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <WalletSection />
          <ContractInfo ethUsd={ethUsd} balance={balance} />
          <motion.div
            className={`flex-1 flex flex-col gap-6 md:order-2 rounded-3xl p-6 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-white"}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProductList products={products} />
          </motion.div>
        </motion.div>
        {/* Right side: AddProductForm, PayProductForm */}
        <motion.div
          className={`w-full md:w-80 flex flex-col gap-6 order-1 md:order-1 rounded-3xl p-6 ${resolvedTheme === "dark" ? "bg-gray-800" : "bg-white"}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AddProductForm
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            handleAdd={handleAdd}
          />
          <PayProductForm
            productId={productId}
            setProductId={setProductId}
            handlePay={handlePay}
          />
        </motion.div>
      </motion.div>
      <div className="h-2 md:h-11" />

    </main>
  );
}

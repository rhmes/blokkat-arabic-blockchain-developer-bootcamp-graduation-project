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
    watch: true,
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
    watch: true,
  });

  const { data: ethUsd, refetch: refetchEthUsd } = useReadContract({
    ...usdStoreContract,
    functionName: "getLatestETHUSD",
    watch: true,
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-300"
      >
        USD Store DApp
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex space-x-4 mb-8"
      >
        <WalletSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 w-full max-w-4xl"
      >
        <AddProductForm
          name={name}
          price={price}
          setName={setName}
          setPrice={setPrice}
          handleAdd={handleAdd}
        />
        <PayProductForm
          productId={productId}
          setProductId={setProductId}
          handlePay={handlePay}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl"
      >
        <ProductList products={products} />
        <ContractInfo ethUsd={ethUsd} balance={balance} />
      </motion.div>
    </main>
  );
}

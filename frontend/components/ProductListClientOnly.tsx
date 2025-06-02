"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { usePublicClient, useReadContract } from "wagmi";
import abi from "../abi/USDStore.abi.json";
import { Address } from "viem";

export default function ProductListClientOnly() {
  const usdStoreContract = {
    address: "0x931aD472B5E0C2D7C56666bfb6e5E29A8EBeA40B" as Address,
    abi: abi,
    chainId: 534351,
  };
  const publicClient = usePublicClient();
  const { data: productCount } = useReadContract({
    ...usdStoreContract,
    functionName: "productCount",
  });
  type Product = { id: number; priceUSD: number; name: string; priceETH: number };
  type ProductFromContract = [number, string, boolean];
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    if (!productCount || !publicClient) return;
    setLoading(true);
    setError(null);
    const count = Number(productCount);
    const fetched = [];
    for (let i = 0; i < count; i++) {
      try {
        const p = await publicClient.readContract({
          ...usdStoreContract,
          functionName: "products",
          args: [i],
        }) as ProductFromContract;
        if (!p || !p[2]) continue;
        let p_inETH = 0;
        try {
          p_inETH = Number(await publicClient.readContract({
            ...usdStoreContract,
            functionName: "getPriceInETH",
            args: [i],
          }));
        } catch (err) {
          console.warn("Error fetching price in ETH for product", i, err);
        }
        fetched.push({ id: i, priceUSD: p[0], name: p[1], priceETH: p_inETH });
      } catch (err) {
        console.error("Error fetching product", i, err);
      }
    }
    setProducts(fetched);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productCount]);

  // Network check: Scroll Sepolia chainId = 534351
  if (publicClient && publicClient.chain && publicClient.chain.id !== 534351) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-200 via-indigo-100 to-white border-2 border-indigo-400 text-indigo-900 shadow-lg animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
          <span className="font-semibold text-lg">Please switch your wallet network to <span className="underline decoration-indigo-500 font-bold">Scroll Sepolia</span> to view products.</span>
        </div>
      </div>
    );
  }
  if (!publicClient) return <div className="text-center text-gray-400">Connect your wallet to view products.</div>;
  if (loading) return <div className="text-center text-gray-400">Loading products...</div>;
//   if (!products.length) return <div className="text-center text-gray-400">No products found.</div>;
    if(!products.length) { fetchAllProducts();}
  return <ProductList products={products} />;
}

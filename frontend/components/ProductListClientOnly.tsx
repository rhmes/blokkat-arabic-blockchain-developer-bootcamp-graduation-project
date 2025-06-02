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

  const fetchAllProducts = async () => {
    if (!productCount || !publicClient) return;
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
        } catch {}
        fetched.push({ id: i, priceUSD: p[0], name: p[1], priceETH: p_inETH });
      } catch {}
    }
    setProducts(fetched);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productCount]);

  if (!publicClient) return <div>Connect your wallet to view products.</div>;
  return <ProductList products={products} />;
}

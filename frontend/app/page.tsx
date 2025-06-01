"use client";
import React, {useEffect, useState} from "react";
import { useReadContract, useWriteContract, useAccount, useWatchContractEvent, usePublicClient} from "wagmi";
// import { parseEther } from "viem";
import abi from '../abi/USDStore.abi.json';
// import { readContract } from 'wagmi/actions';

export default function Home() {
  const usdStoreContract = {
    address: "0x931aD472B5E0C2D7C56666bfb6e5E29A8EBeA40B",
    abi: abi,
    chainId: 534351, // Scroll Sepolia
  }
  // const { address, isConnected } = useAccount();
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
  // Fetch all products from the contract
  const fetchAllProducts = async () => {
    if (!productCount) return;
    const count = Number(productCount);
    const fetched = [];
    for (let i = 0; i < count; i++) {
      try {
        const p = await publicClient.readContract(
          {
            ...usdStoreContract,
            functionName: "products",
            args: [i],
          },
          {
            chainId: usdStoreContract.chainId,
          }
        );
      // If the product is not found, continue to the next iteration
        if (!p || !p[2]) continue; // skip if not exists
        let p_inETH = 0;
        try {
          p_inETH = await publicClient.readContract(
            {
              ...usdStoreContract,
              functionName: "getPriceInETH",
              args: [i],
            },
            {
              chainId: usdStoreContract.chainId,
            }
          );
        } catch (err) {
          console.warn("Error fetching price in ETH for product", i, err);
          // continue; // skip if error fetching price in ETH
        }
        fetched.push({ id: i, priceUSD: p[0], name: p[1], priceETH: p_inETH });
      } catch (err) {
        continue;
      }
    }
    setProducts(fetched);
  };
  // Use useEffect to fetch products when productCount changes
  useEffect(() => {
    if (productCount) fetchAllProducts();
  }, [productCount]);
  // Handle adding a product request
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
    // Immediately update products list
    fetchAllProducts();
    refetchBalanceFn();
    refetchETHPrice();
  };
  // Handle payment for a product
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
    // Immediately update products list
    fetchAllProducts();
    refetchBalanceFn();
    refetchETHPrice();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the USD Store DApp</h1>

      <div className="p-4 m-4">
        <w3m-button />
        <w3m-network-button />
      </div>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">USDStore DApp</h1>

        {/* Add Product */}
        <div className="p-4 border rounded-xl space-y-2">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <input
            className="border p-2 w-full rounded"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Price in USD (e.g., 29.99)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>

        {/* Pay for Product */}
        <div className="p-4 border rounded-xl space-y-2">
          <h2 className="text-lg font-semibold">Pay for Product</h2>
          <input
            className="border p-2 w-full rounded"
            type="number"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(parseInt(e.target.value))}
          />
          <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 rounded">
            Pay
          </button>
        </div>

        {/* Products List */}
        <div className="p-4 border rounded-xl space-y-2">
          <h2 className="text-lg font-semibold">All Products</h2>
          {products.map((p: any) => (
            <div key={p.id} className="border p-2 rounded">
              <p><strong>Name: {p.name}</strong></p>
              <p>USD: ${Number(p.priceUSD) / 100}</p>
              <p>ETH: ♦{Number(p.priceETH) / 1e18}</p>
            </div>
          ))}
        </div>

        {/* Contract Info */}
        <div className="p-4 border rounded-xl">
          <p>ETH/USD Price: {ethUsd ? Number(ethUsd) / 1e18 : "Loading..."}</p>
          <p>Contract Balance: {balance ? Number(balance) / 1e18 : "Loading..."} ETH</p>
        </div>
      </div>
    </main>
  );
}

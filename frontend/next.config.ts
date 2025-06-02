import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      stream: false,
    };
    return config;
  },
};

module.exports = nextConfig;

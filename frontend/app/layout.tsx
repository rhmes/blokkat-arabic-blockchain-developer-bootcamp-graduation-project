// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { headers } from "next/headers"; // added
import ContextProvider from '@/context'
// import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const hdrs = await headers();
  const cookies = hdrs.get('cookie');

  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <ContextProvider cookies={cookies}>
            {children}
        </ContextProvider>
      </body>
    </html>
  )
}
// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import { ThemeProvider } from "next-themes"
import ContextProvider from "@/context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const hdrs = headers()
  const cookies = (await hdrs).get("cookie")

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

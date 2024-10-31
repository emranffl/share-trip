import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"
import TanStackQueryProvider from "@/utils/providers/TanStackQuery.Provider"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const murechoSans = localFont({
  src: "./fonts/Murecho/Murecho-VariableFont_wght.ttf",
  variable: "--font-murecho-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Share Trip",
  description: "Share Trip is a social media platform for sharing your travel experiences.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", murechoSans.variable)}>
        <Navbar />
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
      </body>
    </html>
  )
}

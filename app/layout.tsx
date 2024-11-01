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

const TITLE = {
  /**
   * `title.template` can be used to add a prefix or a suffix
   * to title's defined in child route segments
   */
  template: `%s • Dummy JSON`,
  /**
   * `title.default` can be used to provide a fallback title
   * to child route segments that don't define a title
   */
  default: `Dummy JSON`,
}

export const metadata: Metadata = {
  title: TITLE,
  description: "Dummy JSON is a free and open-source API for generating random data.",
  robots: "noindex, nofollow",
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

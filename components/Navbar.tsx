"use client"

import { LINKS } from "@/router.config"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Cart } from "./Cart"

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[999] border-b border-slate-900/10 bg-white dark:border-slate-300/10 dark:bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold opacity-90 hover:opacity-100 dark:opacity-90 dark:hover:opacity-100"
        >
          DummyJSON
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-1">
          <Link href={LINKS.WISHLIST.home}>
            <Heart className="size-6 fill-inherit" />
          </Link>
          <Cart />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

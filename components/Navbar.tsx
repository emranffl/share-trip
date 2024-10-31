"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Fragment, useEffect, useState } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { LINKS } from "@/router.config"
import { ArrowLeftIcon, Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
// import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"

export function Navbar() {
  const [scrolling, setScrolling] = useState(false)
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const handleHamburger = () => {
    if (!navOpen) {
      setNavOpen(true)
    } else {
      setNavOpen(false)
    }
  }

  const NAV_ITEMS = React.useMemo(
    () =>
      [
        {
          title: "Home",
          slug: LINKS.home,
          description: null,
          children: null,
        },
        {
          title: "WishList",
          slug: LINKS.WISHLIST.home,
          description: null,
          children: null,
        },
      ] as const,
    [],
  )

  const [mobNav, setMobNav] = useState({ navItems: NAV_ITEMS, level: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Check if scroll position is over a certain value
      if (scrollPosition > 100) {
        setScrolling(true)
      } else {
        setScrolling(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (navOpen) {
      setMobNav({ navItems: NAV_ITEMS, level: 0 })
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [navOpen, NAV_ITEMS])

  return (
    <nav className="fixed inset-x-0 top-0 z-[999] border-b border-slate-900/10 bg-white dark:border-slate-300/10 dark:bg-background">
      {/* //=> Desktop Menu */}
      <div className="container hidden h-16 items-center justify-between sm:flex">
        <Link
          href="/"
          className="text-5xl font-bold opacity-90 hover:opacity-100 dark:opacity-90 dark:hover:opacity-100"
        >
          ZA
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {NAV_ITEMS.filter(
              (e) => !e.children,
            ) /** filter nav items that does not have children ie sub-items */
              .map((item, index) => {
                const GenericNavItems = () => (
                  <NavigationMenuItem>
                    <Link href={item.slug!} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname == item.slug && "bg-secondary",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
                if (index === 2) {
                  return (
                    <Fragment key={item.title}>
                      <GenericNavItems />
                    </Fragment>
                  )
                }
                return <GenericNavItems key={index} />
              })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* <div className="flex flex-wrap items-center justify-center gap-1">
          <ModeToggle className="ml-4" />
        </div> */}
      </div>

      {/* //=> Mobile Menu */}
      <div
        className={cn(
          "container flex items-center justify-between sm:hidden",
          scrolling ? "h-16" : "h-16",
        )}
      >
        <Link
          href="/"
          className="text-4xl font-bold opacity-90 hover:opacity-100 dark:opacity-90 dark:hover:opacity-100"
        >
          ZA
        </Link>

        <div className="flex items-center gap-x-3">
          {/* {!navOpen && <ModeToggle />} */}

          <Button
            size={"icon"}
            variant={"outline"}
            className="hover:bg-transparent"
            onClick={handleHamburger}
          >
            <HamburgerMenuIcon
              className={cn(
                "absolute size-5 rotate-0 scale-100 transform transition",
                scrolling ? "text-foreground" : "text-foreground dark:text-foreground",
                navOpen && "rotate-90 scale-0",
              )}
            />
            <Cross1Icon
              className={cn(
                "absolute size-5 -rotate-90 scale-0 transform transition-transform",
                scrolling ? "text-foreground" : "text-foreground dark:text-foreground",
                navOpen && "rotate-0 scale-100",
              )}
            />
          </Button>
        </div>
      </div>

      {navOpen && (
        <div
          className={cn(
            "absolute left-0 right-0 top-20 h-[100dvh] bg-gradient-to-b from-background via-background backdrop-blur transition sm:hidden",
            scrolling ? "top-16" : "top-16",
          )}
        >
          {/* // + mob nav back button */}
          <div className="container mt-20 space-y-4">
            {mobNav.navItems !== NAV_ITEMS && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMobNav({
                    navItems: NAV_ITEMS,
                    level: 0,
                  })
                }}
              >
                <ArrowLeftIcon className="size-6" />
              </Button>
            )}

            {/* // + mob nav items */}
            {mobNav.navItems.map((item, index) => {
              const className = cn(
                "group/mobnavlink flex items-center py-2 text-xl opacity-75 transition-opacity hover:opacity-100 active:text-primary hover:cursor-pointer pl-2",
                pathname == item.slug && "text-primary opacity-100",
              )
              const animationDelay = 0.05

              return (
                <Fragment key={item.title}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -104,
                    }}
                    transition={{
                      type: "tween",
                      delay: animationDelay * index,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                  >
                    <Link onClick={handleHamburger} href={item.slug} className={className}>
                      {item.title}
                    </Link>
                  </motion.div>
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href = "/", ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            href={href}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default Navbar

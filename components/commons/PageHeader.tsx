import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import React from "react"

interface PageHeaderProps {
  title: string
  paragraph?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: boolean
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  paragraph,
  as = "h1",
  asChild = false,
  className = "",
}) => {
  // Mapping of heading levels with appropriate Tailwind classes
  const headingClasses = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
  }

  // Component to render - either the specified heading or a Slot
  const Component = asChild ? Slot : as

  return (
    <div className={cn("max-w-prose", className)}>
      <Component className={cn("text-gray-900 dark:text-gray-100", headingClasses[as])}>
        {title}
      </Component>

      {paragraph && (
        <p className="mt-2 max-w-[80ch] text-balance text-gray-600 dark:text-gray-400">
          {paragraph}
        </p>
      )}
    </div>
  )
}

export default PageHeader

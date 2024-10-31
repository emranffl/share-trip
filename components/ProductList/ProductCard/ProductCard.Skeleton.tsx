import { cn } from "@/lib/utils"

const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative rounded-lg bg-white p-2", className)}>
      {/* Thumbnail skeleton */}
      <div className="relative">
        <div className="h-64 w-full animate-pulse rounded-md bg-slate-200" />

        {/* Wishlist button skeleton */}
        <div className="absolute right-2 top-2 size-10 animate-pulse rounded-full bg-slate-200" />

        {/* Button container skeleton */}
        {/* <div className="absolute bottom-0 left-0 w-full space-y-2 p-2">
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
        </div> */}
      </div>

      {/* Content skeleton */}
      <div className="space-y-2 p-2">
        {/* SKU skeleton */}
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

        {/* Title skeleton */}
        <div className="h-6 w-full animate-pulse rounded bg-slate-200" />

        {/* Price skeleton */}
        <div className="!mt-3 flex items-center gap-2">
          <div className="h-7 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  )
}

export { ProductCardSkeleton }

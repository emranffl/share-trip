import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWishlistStore } from "@/store/wishlist"
import { Heart } from "lucide-react"

const WishlistButton = ({ id, className }: { id: string | number; className?: string }) => {
  const { wishlist, toggleWishlist } = useWishlistStore()
  const isWishlisted = wishlist.includes(Number(id))
  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleWishlist(id)
  }
  return (
    <>
      <Button
        onClick={handleWishlistToggle}
        variant={"outline"}
        className={cn(
          "absolute right-2 top-2 size-10 rounded-full border-none p-1 text-foreground/50 backdrop-blur-sm hover:bg-slate-500/20 hover:text-red-700",
          className,
        )}
        aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? (
          <Heart className="size-6 fill-red-700 text-red-700" />
        ) : (
          <Heart className="size-6" />
        )}
      </Button>
    </>
  )
}

export { WishlistButton }

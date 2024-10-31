import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useShoppingCartStore } from "@/store/cart"
import { ShoppingBag } from "lucide-react"
import React from "react"
import { CardContent } from "./CardContent.Client"
import { CartItemSkeleton } from "./CartItems.Client"

const Cart = () => {
  const { cart, getTotalItems } = useShoppingCartStore()
  const [isLoading, setIsLoading] = React.useState(false)
  const totalItems = getTotalItems()

  return (
    <Sheet>
      {/* // + cart trigger button */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="size-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* // + cart sheet */}
      <SheetContent className="z-[1000] flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {cart.length > 0 && `(${totalItems})`}</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {isLoading ? (
          <div className="space-y-4 pr-6">
            {[1, 2, 3].map((i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        ) : cart.length > 0 ? (
          // + cart content
          <CardContent setIsLoading={setIsLoading} />
        ) : (
          // + empty cart
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-center text-sm text-muted-foreground">
              Add items to your cart to see them here.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export { Cart }

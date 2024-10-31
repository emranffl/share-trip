"use client"

import { useShoppingCartStore } from "@/store/cart"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { CartItem } from "./CartItems.Client"
import { CartSummary } from "./CartSummary"

const CardContent = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { cart } = useShoppingCartStore()

  const handleCheckout = async () => {
    setIsLoading(true)
    // Add your checkout logic here
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
    setIsLoading(false)
  }

  return (
    <>
      <ScrollArea className="flex-1 pr-6">
        <div className="space-y-5">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
      <div className="space-y-4 pr-6">
        <Separator className="my-4" />
        <CartSummary />
        <Button className="w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </>
  )
}

export { CardContent }

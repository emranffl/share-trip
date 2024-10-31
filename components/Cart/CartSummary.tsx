import { CONSTANTS } from "@/lib/constants"
import { useShoppingCartStore } from "@/store/cart"
import { Separator } from "../ui/separator"

const CartSummary = () => {
  const { getCartTotal } = useShoppingCartStore()
  const subtotal = getCartTotal()
  const shippingThreshold = 499 // free shipping threshold
  const shippingCost = subtotal >= shippingThreshold ? 0 : 10 // shipping cost
  const vat = subtotal * 0.07 // 7% tax
  const total = subtotal + shippingCost + vat

  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <h4 className="mb-3 font-medium">Order Summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>
            {CONSTANTS.currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shippingCost === 0 ? "Free" : `${CONSTANTS.currency}${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Vat (7%)</span>
          <span>
            {CONSTANTS.currency}
            {vat.toFixed(2)}
          </span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>
            {CONSTANTS.currency}
            {total.toFixed(2)}
          </span>
        </div>
        {subtotal < shippingThreshold && (
          <p className="mt-2 text-xs text-blue-600">
            Add {CONSTANTS.currency}
            {Math.ceil(shippingThreshold - subtotal).toFixed(0)} more for free shipping
          </p>
        )}
      </div>
    </div>
  )
}

export { CartSummary }

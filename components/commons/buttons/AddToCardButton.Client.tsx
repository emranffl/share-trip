"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductDetailsAPIProps } from "@/services/api/product/product-details"
import { useShoppingCartStore } from "@/store/cart"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import React from "react"

interface AddToCartButtonProps {
  product: ProductDetailsAPIProps
  className?: string
  variant?: ButtonProps["variant"]
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className, variant }) => {
  const { id } = product
  const { cart, addToCart, updateQuantity, removeFromCart } = useShoppingCartStore()
  const item = cart.find((item) => item.id === id)
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!item) addToCart(product)
  }
  const handleRemoveFromCart = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    removeFromCart(id)
  }
  const handleIncrement = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    console.log("increment")

    updateQuantity(id, item ? item.quantity + 1 : 1)
  }
  const handleDecrement = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    console.log("decrement")

    updateQuantity(id, item ? item.quantity - 1 : 1)
  }
  // + components
  const IncrementItems = () => {
    return (
      <Plus className="size-5 transition-transform hover:scale-125" onClick={handleIncrement} />
    )
  }
  const DecrementItems = () => {
    return (
      <Minus className="size-5 transition-transform hover:scale-125" onClick={handleDecrement} />
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant ?? (item ? "secondary" : "outline")}
      className={cn("flex items-center gap-2 text-foreground backdrop-blur-sm", className)}
    >
      {item ? (
        item.quantity === 1 ? (
          <>
            <Trash2
              className="size-5 transition-transform hover:scale-125"
              onClick={handleRemoveFromCart}
            />
            <span className="mx-auto">{item.quantity} Added in Cart</span>
            <IncrementItems />
          </>
        ) : (
          <>
            <DecrementItems />
            <span className="mx-auto">{item.quantity} Added in Cart</span>
            <IncrementItems />
          </>
        )
      ) : (
        <>
          <ShoppingCart className="size-5" strokeWidth={1.5} />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  )
}

export { AddToCartButton }

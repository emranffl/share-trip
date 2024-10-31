"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CONSTANTS } from "@/lib/constants"
import { useShoppingCartStore } from "@/store/cart"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"

interface CartItemProps {
  id: number
  product: {
    title: string
    price: number
    discountPercentage: number
    stock: number
    thumbnail: string
  }
  quantity: number
}

const CartItem = ({ item }: { item: CartItemProps }) => {
  const { updateQuantity, removeFromCart, getItemSubtotal, getDiscountedPrice } =
    useShoppingCartStore()
  const discountedPrice = getDiscountedPrice(item.product.price, item.product.discountPercentage)
  const isDiscounted = item.product.discountPercentage > 0.5
  const subtotal = getItemSubtotal(item.id)

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center space-x-4 pb-4 shadow-sm last-of-type:shadow-none">
      {/* // + thumbnail */}
      <Image
        src={item.product.thumbnail}
        alt={item.product.title}
        className="mb-auto size-24 rounded-md object-cover"
        width={100}
        height={100}
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{item.product.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-md text-muted-foreground">
            {CONSTANTS.currency}
            {discountedPrice.toFixed(2)}
          </span>
          {isDiscounted && (
            <span className="text-sm text-muted-foreground line-through">
              {CONSTANTS.currency}
              {item.product.price.toFixed(2)}
            </span>
          )}
          {isDiscounted && (
            <Badge variant="secondary" className="text-xs">
              {item.product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        {/* // + quantity buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {/* // + item total */}
          <span className="text-sm font-medium">
            {CONSTANTS.currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        {/* // + max stock waning */}
        {item.quantity >= item.product.stock && (
          <small className="text-amber-500">Max stock reached</small>
        )}
      </div>
    </div>
  )
}

const CartItemSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-20 w-20 rounded-md" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-8" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
    <Skeleton className="h-8 w-8 rounded-md" />
  </div>
)

export { CartItem, CartItemSkeleton }

import { ProductDetailsAPIProps } from "@/services/api/product/product-details"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

// Type for cart item that includes full product details
interface CartItemProps {
  id: number
  quantity: number
  product: Omit<ProductDetailsAPIProps, "reviews" | "meta"> // Excluding reviews and meta to keep storage minimal
}

interface ShoppingCartState {
  cart: CartItemProps[]
  addToCart: (product: ProductDetailsAPIProps) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (id: number) => number
  getCartTotal: () => number
  getItemSubtotal: (id: number) => number
  getTotalItems: () => number
  getDiscountedPrice: (price: number, discountPercentage: number) => number
}

const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add item to cart with full product details
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          } else {
            // Store product details without reviews and meta
            const { reviews, meta, ...productWithoutReviews } = product
            return {
              cart: [
                ...state.cart,
                {
                  id: product.id,
                  quantity: 1,
                  product: productWithoutReviews,
                },
              ],
            }
          }
        }),

      // Remove item from cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Update quantity of an item
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),

      // Clear entire cart
      clearCart: () =>
        set(() => ({
          cart: [],
        })),

      // Get quantity of a specific item
      getItemQuantity: (id) => {
        const item = get().cart.find((item) => item.id === id)
        return item?.quantity || 0
      },

      // Calculate discounted price
      getDiscountedPrice: (price, discountPercentage) => {
        return parseFloat((price * (1 - discountPercentage / 100)).toFixed(2))
      },

      // Get subtotal for a specific item (including discount)
      getItemSubtotal: (id) => {
        const item = get().cart.find((item) => item.id === id)
        if (!item) return 0
        const discountedPrice = get().getDiscountedPrice(
          item.product.price,
          item.product.discountPercentage,
        )
        return parseFloat((discountedPrice * item.quantity).toFixed(2))
      },

      // Get total price of all items in cart
      getCartTotal: () => {
        return parseFloat(
          get()
            .cart.reduce((total, item) => {
              const discountedPrice = get().getDiscountedPrice(
                item.product.price,
                item.product.discountPercentage,
              )
              return total + discountedPrice * item.quantity
            }, 0)
            .toFixed(2),
        )
      },

      // Get total number of items in cart
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "shopping-cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist the cart array
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
)

export { useShoppingCartStore }
export type { CartItemProps }

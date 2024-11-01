import { ProductDetailsAPIProps } from "@/services/api/product/product-details"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface WishlistState {
  wishlist: ProductDetailsAPIProps[]
  toggleWishlist: (product: ProductDetailsAPIProps) => void
  isWishlisted: (id: number) => boolean
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) =>
        set((state) => {
          const isWishlisted = state.wishlist.some((item) => item.id === product.id)

          if (isWishlisted) {
            // Remove from wishlist if already exists
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            }
          } else {
            // Add to wishlist
            return {
              wishlist: [...state.wishlist, product],
            }
          }
        }),

      isWishlisted: (id) => {
        return get().wishlist.some((item) => item.id === id)
      },
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlist: state.wishlist,
      }),
    },
  ),
)

export { useWishlistStore }

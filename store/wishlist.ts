import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface WishlistState {
  wishlist: number[]
  toggleWishlist: (id: string | number) => void
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (id) =>
        set((state) => {
          const isWishlisted = state.wishlist.includes(Number(id))
          const updatedWishlist = isWishlisted
            ? state.wishlist.filter((id) => id !== id)
            : [...state.wishlist, Number(id)]

          return { wishlist: updatedWishlist }
        }),
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useWishlistStore }

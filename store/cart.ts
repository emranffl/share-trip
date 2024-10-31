import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ShoppingCartState {
  cart: { id: number | string; quantity: number }[]
  addToCart: (id: number | string) => void
  removeFromCart: (id: number | string) => void
  updateQuantity: (id: number | string, quantity: number) => void
  clearCart: () => void
}

const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (id) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          } else {
            return { cart: [...state.cart, { id, quantity: 1 }] }
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    {
      name: "shopping-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useShoppingCartStore }

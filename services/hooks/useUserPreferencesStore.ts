import { CONSTANTS } from "@/lib/constants"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getProductList } from "../api/product-list"

type ProductListAPIParams = Parameters<typeof getProductList>[0]

// Define the state interface
interface UserPreferencesState extends ProductListAPIParams {
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setSortBy: (sortBy: string) => void
  setOrderBy: (orderBy: string) => void
}

// Create the Zustand store with persistence
const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      limit: CONSTANTS.limit,
      skip: CONSTANTS.skip,
      sortBy: CONSTANTS.sortBy,
      orderBy: CONSTANTS.orderBy,
      setLimit: (limit: number) => set({ limit }),
      setSkip: (skip: number) => set({ skip }),
      setSortBy: (sortBy: string) => set({ sortBy }),
      setOrderBy: (orderBy: string) => set({ orderBy }),
    }),
    {
      name: "user-preferences", // Name of the key in localStorage
    },
  ),
)

export { useUserPreferencesStore }

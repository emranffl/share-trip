import { CONSTANTS } from "@/lib/constants"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getProductList } from "../services/api/product/product-list"

type ProductListAPIParams = Parameters<typeof getProductList>[0]

interface UserPreferencesState extends ProductListAPIParams {
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setSortBy: (sortBy: string) => void
  setOrderBy: (orderBy: string) => void
  category: string
  setCategory: (category: string) => void
  searchText: string
  setSearchText: (searchText: string) => void
}

const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      limit: CONSTANTS.limit,
      skip: CONSTANTS.skip,
      sortBy: CONSTANTS.sortBy,
      orderBy: CONSTANTS.orderBy,
      category: "",
      searchText: "",
      setLimit: (limit: number) => set({ limit }),
      setSkip: (skip: number) => set({ skip }),
      setSortBy: (sortBy: string) => set({ sortBy }),
      setOrderBy: (orderBy: string) => set({ orderBy }),
      setCategory: (category: string) => set({ category }),
      setSearchText: (searchText: string) => set({ searchText }),
    }),
    {
      name: "user-preferences",
    },
  ),
)

export { useUserPreferencesStore }

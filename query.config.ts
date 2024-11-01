import { getProductList } from "./services/api/product/product-list"

/**
 * List of all the query keys in the app for data fetching/mutation
 */
export const QUERY = {
  CATEGORY: {
    LIST: () => {
      return { key: `category-list` as const }
    },
  },
  PRODUCT: {
    LIST: ({ limit, skip, sortBy, orderBy }: Parameters<typeof getProductList>[0]) => {
      return {
        key: `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${orderBy}` as const,
        BY_CATEGORY: (category: string) => {
          return {
            key: `/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${orderBy}` as const,
          }
        },
        SEARCH: (searchText: string) => {
          return {
            home: `/products/search?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${orderBy}&searchText=${searchText}`,
          } as const
        },
      }
    },
    DYNAMIC: (slug: string) => {
      return { key: `product/${slug}` as const }
    },
  },
}

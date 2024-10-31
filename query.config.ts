import { getProductList } from "./services/api/product-list"

/**
 * List of all the query keys in the app for data fetching/mutation
 */
export const QUERY = {
  PRODUCT: {
    LIST: ({ limit, skip, sortBy, orderBy }: Parameters<typeof getProductList>[0]) => {
      return { key: `product-list-${limit}-${skip}-${sortBy}-${orderBy}` as const }
    },
    DYNAMIC: (slug: string) => {
      return { key: `product-details-${slug}` as const }
    },
  },
}

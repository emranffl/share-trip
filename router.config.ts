/**
 * List of all the routes in the app for frontend rendering
 */
export const LINKS = {
  home: "/",
  PRODUCT: {
    DYNAMIC: (slug: string | number) => {
      return {
        home: `/product/${slug}`,
      } as const
    },
  },
  WISHLIST: {
    home: "/wishlist",
  },
} as const

/**
 * List of all the paths in the app for backend data fetching
 */
export const PATHS = {
  PRODUCT: {
    DYNAMIC: (id: string | number) => {
      return {
        home: `/product/${id}`,
      } as const
    },
    LIST: ({
      limit,
      skip,
      sortBy,
      orderBy,
    }: {
      limit: number
      skip: number
      sortBy: string
      orderBy: string
    }) => {
      return {
        home: `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${orderBy}`,
      } as const
    },
  },
} as const

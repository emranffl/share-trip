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
  PRODUCT: {},
} as const

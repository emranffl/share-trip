"use client"

import { CONSTANTS } from "@/lib/constants"
import { QUERY } from "@/query.config"
import { getProductList } from "@/services/api/product-list"
import { useUserPreferencesStore } from "@/services/hooks/useUserPreferencesStore"
import { useWishlistStore } from "@/store/wishlist"
import { useQuery } from "@tanstack/react-query"
import { isEmpty } from "lodash"
import { useEffect } from "react"
import EmptyRecordsCard from "../Card/EmptyRecordsCard"
import ErrorCard from "../Card/ErrorCard"
import PageHeader from "../commons/PageHeader"
import { Pagination } from "./Pagination.Client"
import { ProductCard } from "./ProductCard"
import { ProductCardSkeleton } from "./ProductCard/ProductCard.Skeleton"

const Grid = ({ isWishlistRoute }: { isWishlistRoute?: true }) => {
  // * Fetch user preferences from Zustand
  const { limit, skip, sortBy, orderBy, setLimit, setSkip, setOrderBy, setSortBy } =
    useUserPreferencesStore()
  const { wishlist } = useWishlistStore()

  // * Fetch wishlist
  // const { wishlist } = useWishlistStore()

  // * Handle input for search and filter
  // const handleInput = (newValue: string, type: "searchText" | "topic") => {
  //   if (type === "searchText") {
  //     // setSearchText(newValue)
  //   } else {
  //     // setTopic(newValue)
  //   }
  // }

  // * Fetch product list
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      QUERY.PRODUCT.LIST({
        limit,
        skip,
        sortBy,
        orderBy,
      }).key,
    ],
    queryFn: async () => await getProductList({ limit, skip, sortBy, orderBy }),
  })

  // * Set Zustand state when component mounts
  useEffect(() => {
    // * Set page number to 1 when not on wishlist route
    if (!isWishlistRoute) {
      setLimit(CONSTANTS.limit)
      setSkip(CONSTANTS.skip)
      setSortBy(CONSTANTS.sortBy)
      setOrderBy(CONSTANTS.orderBy)
    }

    // * Set search text and topic to empty string when on wishlist route
    if (isWishlistRoute) {
    }
  }, [isWishlistRoute, setLimit, setOrderBy, setSkip, setSortBy])

  // + Error handling
  if (isError) {
    return <ErrorCard />
  }

  const dataToDisplay = isWishlistRoute ? wishlist : data?.products

  return (
    <>
      {/* // + Search & filter */}
      <div className="sticky top-10 z-20 grid gap-5 bg-background py-5 bx-container xl:top-16">
        <PageHeader
          title={isWishlistRoute ? "Wishlist" : "Products"}
          paragraph={
            isWishlistRoute
              ? "Find all your favorite products here. Add them to your cart and continue shopping."
              : "Explore our wide range of products and find the perfect one for you."
          }
        />
        {!isWishlistRoute && (
          <div className="flex items-center justify-end gap-2">
            {/* <DebouncedSearchInput value={searchText} onChange={handleInput} /> */}
            {/* <TopicFilter bookshelves={bookshelves} onSelect={handleInput} selectedItem={topic} /> */}
          </div>
        )}
      </div>

      {/* // + Card grid */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
        {!isEmpty(dataToDisplay) ? (
          dataToDisplay?.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))
        ) : (
          <EmptyRecordsCard className="col-span-full" />
        )}

        {/* // + Loading Skeleton */}
        {isLoading && Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {/* // + Pagination */}
        {!isWishlistRoute && data && (
          <Pagination
            limit={limit}
            skip={skip}
            setLimit={setLimit}
            setSkip={setSkip}
            totalCount={data.total}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  )
}

export default Grid

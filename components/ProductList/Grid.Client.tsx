"use client"

import { CONSTANTS } from "@/lib/constants"
import { QUERY } from "@/query.config"
import { getProductList, ProductListAPIProps } from "@/services/api/product/product-list"
import {
  getProductListByCategory,
  type ProductListByCategoryAPIProps,
} from "@/services/api/product/product-list-by-category"
import { useUserPreferencesStore } from "@/store/preferences"
import { useWishlistStore } from "@/store/wishlist"
import { useQuery } from "@tanstack/react-query"
import { isEmpty } from "lodash"
import { useEffect } from "react"
import EmptyRecordsCard from "../Card/EmptyRecordsCard"
import ErrorCard from "../Card/ErrorCard"
import PageHeader from "../commons/PageHeader"
import { CategoryFilter } from "./CategoryFilter.Client"
import DebouncedSearchInput from "./DebounceInput.Client"
import { Pagination } from "./Pagination.Client"
import { ProductCard } from "./ProductCard"
import { ProductCardSkeleton } from "./ProductCard/ProductCard.Skeleton"

const Grid = ({ isWishlistRoute }: { isWishlistRoute?: true }) => {
  // * Fetch user preferences from Zustand
  const {
    limit,
    skip,
    sortBy,
    orderBy,
    category,
    searchText,
    setLimit,
    setSkip,
    setOrderBy,
    setSortBy,
    setCategory,
    setSearchText,
  } = useUserPreferencesStore()
  // * Fetch wishlist
  const { wishlist } = useWishlistStore()

  // * Handle input for search and filter
  const handleInput = (newValue: string, type: "searchText" | "category") => {
    if (type === "searchText") {
      setSearchText(newValue)
    } else {
      setCategory(newValue)
    }
  }

  // * Fetch product list
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
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

  // * Fetch product list by category
  const {
    data: productsByCategory,
    isLoading: isProductsByCategoryLoading,
    isError: isProductsByCategoryError,
  } = useQuery({
    queryKey: [
      QUERY.PRODUCT.LIST({
        limit,
        skip,
        sortBy,
        orderBy,
      }).BY_CATEGORY(category).key,
    ],
    queryFn: async () => await getProductListByCategory({ limit, skip, sortBy, orderBy, category }),
    enabled: !!category,
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
      setSearchText("")
      setCategory("")
    }
  }, [isWishlistRoute, setCategory, setLimit, setOrderBy, setSearchText, setSkip, setSortBy])

  // + Error handling
  if (isProductsError) {
    return <ErrorCard />
  }

  const data = isWishlistRoute ? { products: wishlist } : productsByCategory || products
  const isLoading = isProductsByCategoryLoading || isProductsLoading

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
            <DebouncedSearchInput value={searchText} onChange={handleInput} />
            <CategoryFilter onSelect={handleInput} selectedItem={category} />
          </div>
        )}
      </div>

      {/* // + Card grid */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
        {!isEmpty(data) && !isLoading ? (
          data?.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))
        ) : !isLoading ? (
          <EmptyRecordsCard className="col-span-full" />
        ) : null}

        {/* // + Loading Skeleton */}
        {isLoading && Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {/* // + Pagination */}
        {!isWishlistRoute && data && (
          <Pagination
            isLoading={isLoading}
            limit={(data as ProductListAPIProps | ProductListByCategoryAPIProps).limit}
            skip={(data as ProductListAPIProps | ProductListByCategoryAPIProps).skip}
            totalCount={(data as ProductListAPIProps | ProductListByCategoryAPIProps).total}
            setLimit={setLimit}
            setSkip={setSkip}
          />
        )}
      </div>
    </>
  )
}

export default Grid

import { CONSTANTS } from "@/lib/constants"
import { PATHS } from "@/router.config"
import { getAPIResponse } from "@/utils/get-api-response"
import { ProductDetailsAPIProps } from "./product-details"

export interface ProductSearchListAPIProps {
  products: ProductDetailsAPIProps[]
  total: number
  skip: number
  limit: number
}

export const getProductSearchList = async ({
  limit = CONSTANTS.limit,
  skip = CONSTANTS.skip,
  sortBy = CONSTANTS.sortBy,
  orderBy = CONSTANTS.orderBy,
  searchText = "",
}: Parameters<typeof PATHS.PRODUCT.LIST>[0] & {
  searchText: string
}) => {
  const data = await getAPIResponse({
    apiPath: PATHS.PRODUCT.LIST({ limit, skip, sortBy, orderBy }).SEARCH(searchText).home,
  })
  return data as ProductSearchListAPIProps
}

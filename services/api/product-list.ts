import { CONSTANTS } from "@/lib/constants"
import { PATHS } from "@/router.config"
import { getAPIResponse } from "@/utils/get-api-response"
import { ProductDetailsAPIProps } from "./product-details"

export interface ProductListAPIProps {
  products: ProductDetailsAPIProps[]
  total: number
  skip: number
  limit: number
}

export const getProductList = async ({
  limit = CONSTANTS.limit,
  skip = CONSTANTS.skip,
  sortBy = CONSTANTS.sortBy,
  orderBy = CONSTANTS.orderBy,
}: Parameters<typeof PATHS.PRODUCT.LIST>[0]) => {
  const data = await getAPIResponse({
    apiPath: PATHS.PRODUCT.LIST({ limit, skip, sortBy, orderBy }).home,
  })
  return data as ProductListAPIProps
}

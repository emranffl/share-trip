import { CONSTANTS } from "@/lib/constants"
import { PATHS } from "@/router.config"
import { getAPIResponse } from "@/utils/get-api-response"
import { ProductDetailsAPIProps } from "./product-details"

export interface ProductListByCategoryAPIProps {
  products: ProductDetailsAPIProps[]
  total: number
  skip: number
  limit: number
}

export const getProductListByCategory = async ({
  limit = CONSTANTS.limit,
  skip = CONSTANTS.skip,
  sortBy = CONSTANTS.sortBy,
  orderBy = CONSTANTS.orderBy,
  category,
}: Parameters<typeof PATHS.PRODUCT.LIST>[0] & {
  category: string
}) => {
  const data = await getAPIResponse({
    apiPath: PATHS.PRODUCT.LIST({ limit, skip, sortBy, orderBy }).BY_CATEGORY(category).key,
  })
  return data as ProductListByCategoryAPIProps
}

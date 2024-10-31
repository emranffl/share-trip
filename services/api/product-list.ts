import { CONSTANTS } from "@/lib/constants"
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
}: {
  limit: number
  skip: number
  sortBy: string
  orderBy: string
}) => {
  const data = await getAPIResponse({
    apiPath: `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${orderBy}`,
  })
  return data as ProductListAPIProps
}

import { PATHS } from "@/router.config"
import { getAPIResponse } from "@/utils/get-api-response"

export interface ProductDetailsAPIProps {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

interface Dimensions {
  width: number
  height: number
  depth: number
}

interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export const getProductDetails = async (id: Parameters<typeof PATHS.PRODUCT.DYNAMIC>[0]) => {
  const data = await getAPIResponse({
    apiPath: PATHS.PRODUCT.DYNAMIC(id).home,
  })
  return data as ProductDetailsAPIProps
}

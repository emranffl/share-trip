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

export const getProductDetails = async (id: number | string) => {
  const data = await getAPIResponse({
    apiPath: `/product/${id}`,
  })
  return data as ProductDetailsAPIProps
}

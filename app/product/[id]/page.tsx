import { CONSTANTS } from "@/lib/constants"
import { QUERY } from "@/query.config"
import { LINKS } from "@/router.config"
import { getProductDetails } from "@/services/api/product/product-details"
import { getProductList } from "@/services/api/product/product-list"
import { QueryClient } from "@tanstack/react-query"
import { Metadata } from "next/types"
import { ProductDetails } from "./ProductDetails.Client"

// + metadata generation
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const productDetails = await getProductDetails(id)
  const TITLE = `${productDetails ? `${productDetails["title"]}` : `Product Details`}`

  return {
    title: TITLE,
    openGraph: {
      title: TITLE,
      description: productDetails?.description,
      url: process.env.NEXT_PUBLIC_SITE_URL + LINKS.PRODUCT.DYNAMIC(id).home,
      images: {
        url: `${productDetails?.thumbnail}`,
        alt: productDetails?.title,
        width: 1280,
        height: 720,
      },
    },
    twitter: {
      title: TITLE,
      description: productDetails?.description,
      images: {
        url: `${productDetails?.thumbnail}`,
        alt: productDetails?.title,
        width: 1280,
        height: 720,
      },
    },
    description: productDetails?.description,
    keywords: productDetails?.tags,
  }
}

// + ssg static params
export async function generateStaticParams() {
  const { products } = await getProductList({
    limit: 0,
    orderBy: CONSTANTS.orderBy,
    skip: 0,
    sortBy: CONSTANTS.sortBy,
  })

  return products.map((item) => ({
    id: item.id.toString(),
  }))
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const serverQueryClient = new QueryClient()
  const data = await serverQueryClient.fetchQuery({
    queryKey: [QUERY.PRODUCT.DYNAMIC(id).key],
    queryFn: async () => await getProductDetails(id),
  })

  return (
    <>
      <section className="container h-full space-y-12 py-16 sm:py-24">
        {/* <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre> */}
        <ProductDetails product={data} />
      </section>
    </>
  )
}

export default Page

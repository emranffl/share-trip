import { QUERY } from "@/query.config"
import { getProductDetails } from "@/services/api/product-details"
import { QueryClient } from "@tanstack/react-query"
import { ProductDetails } from "./ProductDetails.Client"

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

import Grid from "../../components/ProductList/Grid.Client"

export const metadata = {
  title: "Wishlist",
  description: "Find all your favorite products here. Add them to your cart and continue shopping.",
}

const Page = () => {
  return (
    <section className="container h-full space-y-12 py-16 sm:py-24">
      <Grid isWishlistRoute />
    </section>
  )
}

export default Page

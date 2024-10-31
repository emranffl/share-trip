import Grid from "../Components/Grid.Client"

export default function Home() {
  return (
    <section className="container h-full space-y-12 py-16 sm:py-24">
      <Grid isWishlistRoute />
    </section>
  )
}

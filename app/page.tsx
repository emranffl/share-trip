import Grid from "../components/ProductList/Grid.Client"

export const metadata = {
  title: "Products  • Dummy JSON",
}

export default function Home() {
  return (
    <section className="container h-full space-y-12 py-16 sm:py-24">
      <Grid />
    </section>
  )
}

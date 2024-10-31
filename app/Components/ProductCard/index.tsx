import { WishlistButton } from "@/components/commons/buttons/Wishlist.Client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LINKS } from "@/router.config"
import { ProductListAPIProps } from "@/services/api/product-list"
import { useShoppingCartStore } from "@/store/cart"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import truncate from "truncate"
import { AddToCartButton } from "./AddToCardButton.Client"
import ribbon from "./ribbon.png"

const ProductCard = ({
  product,
  index,
}: {
  product: ProductListAPIProps["products"][0]
  index: number
}) => {
  const { id, thumbnail, title, price, discountPercentage, sku } = product
  const { cart } = useShoppingCartStore()
  const item = cart.find((item) => item.id === id)

  const actualPrice = parseFloat(price.toFixed(2))
  const discountedPrice = parseFloat((price * (1 - discountPercentage / 100)).toFixed(2))
  const discount = parseFloat((actualPrice - discountedPrice).toFixed(2))
  const isDiscounted = discountPercentage > 0.5

  return (
    <>
      <div className="relative rounded-lg bg-white p-2 transition-all hover:shadow-lg">
        {/* // + badge */}
        {isDiscounted && (
          <div className="absolute -left-2 top-1 z-10">
            <Image
              src={ribbon}
              alt={title + "ribbon"}
              className="h-14 w-full object-contain"
              width={100}
              height={50}
            />
            <small className="absolute left-3 top-4 z-20 font-semibold text-background">
              {isDiscounted ? `- ৳${discount}` : "NEW"}
            </small>
          </div>
        )}
        <div className="group relative">
          <Link
            href={LINKS.PRODUCT.DYNAMIC(id).home}
            aria-label={`View ${title}`}
            className="absolute inset-0"
          />
          {/* // + thumbnail */}
          <Image
            src={thumbnail}
            alt={title}
            className="shadow-s h-64 w-full rounded-md border border-slate-100 object-cover"
            width={150}
            height={150}
            priority={index < 6}
          />
          {/* // + wishlist button */}
          <WishlistButton id={id} />
          {/* // + button container */}
          <div className="absolute bottom-0 left-0 grid w-full gap-2 p-2 duration-75 animate-in fade-in hover:transition">
            <AddToCartButton id={id} className={cn("group-hover:flex", item ? "flex" : "hidden")} />
            <Button
              variant="outline"
              className="hidden items-center gap-2 text-foreground backdrop-blur-sm group-hover:flex"
            >
              <EyeIcon className="" strokeWidth={1.5} />
              <span>Quick View</span>
            </Button>
          </div>
        </div>

        {/* // + content */}
        <div className="space-y-1 p-2">
          <span className="text-slate-500">
            <small className="font-medium">SKU: </small>
            <small className="">{sku}</small>
          </span>
          <h3 className="truncate text-lg font-medium">{truncate(title, 70)}</h3>
          {/* <p className="truncate text-gray-600">{description}</p> */}
          <div className="!mt-3 flex items-center">
            <span className="text-xl font-medium text-[#1882FF]">
              ৳{(price * (1 - discountPercentage / 100)).toFixed(2)}
            </span>
            {isDiscounted && (
              <span className="ml-2 text-gray-500 line-through">৳{price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export { ProductCard }

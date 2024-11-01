"use client"

import { AddToCartButton } from "@/components/commons/buttons/AddToCardButton.Client"
import { ImageGallery } from "@/components/commons/ImageGallery.Client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CONSTANTS } from "@/lib/constants"
import { ProductDetailsAPIProps } from "@/services/api/product/product-details"
import { EyeIcon } from "lucide-react"
import { useState } from "react"

const ProductQuickView = ({
  product,
  discountedPrice,
  actualPrice,
  isDiscounted,
}: {
  product: ProductDetailsAPIProps
  discountedPrice: number
  actualPrice: number
  isDiscounted: boolean
}) => {
  const [showQuickView, setShowQuickView] = useState(false)
  const { title, sku, images, thumbnail } = product

  return (
    <>
      <Button
        variant="outline"
        className="hidden items-center gap-2 text-foreground backdrop-blur-sm group-hover:flex"
        onClick={() => setShowQuickView(true)}
      >
        <EyeIcon className="" strokeWidth={1.5} />
        <span>Quick View</span>
      </Button>

      {/* // + dialog */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent
          className="sm:max-w-[800px]"
          aria-label={`Quick view of ${title}`}
          aria-describedby="product-details"
          aria-modal="true"
          role="dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4 md:grid-cols-2">
            <div>
              <ImageGallery images={images || [thumbnail]} title={title} />
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                <small className="text-slate-500">
                  <span className="font-medium">SKU: </span>
                  {sku}
                  <span className="font-medium"> | </span>
                  <span className="font-medium">Rating: </span>
                  {product.rating}/5
                </small>
              </div>
              <p className="">{product.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-medium text-[#1882FF]">
                  {CONSTANTS.currency}
                  {discountedPrice}
                </span>
                {isDiscounted && (
                  <span className="text-lg text-gray-500 line-through">
                    {CONSTANTS.currency}
                    {actualPrice}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <AddToCartButton product={product} className="w-full" variant={"default"} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ProductQuickView }

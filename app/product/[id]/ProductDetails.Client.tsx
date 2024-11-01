"use client"

import { AddToCartButton } from "@/components/commons/buttons/AddToCardButton.Client"
import { WishlistButton } from "@/components/commons/buttons/Wishlist.Client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ProductDetailsAPIProps } from "@/services/api/product/product-details"
import { replace, startCase } from "lodash"
import {
  BarChart,
  Box,
  ChevronLeft,
  File,
  FileText,
  Scale,
  Star,
  TagIcon,
  Truck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDetails = ({ product }: { product: ProductDetailsAPIProps }) => {
  const {
    title,
    availabilityStatus,
    category,
    description,
    dimensions,
    discountPercentage,
    images,
    meta,
    price,
    rating,
    returnPolicy,
    reviews,
    shippingInformation,
    sku,
    stock,
    tags,
    warrantyInformation,
    weight,
    brand,
  } = product
  const [currentImage, setCurrentImage] = useState(0)
  const discountedPrice = price - price * (discountPercentage / 100)
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* // + Back Button */}
      <Link href="/" className="mb-6 inline-block">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 size-5 text-gray-700" />
          Back to Products
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-[450px_1fr]">
        {/* // + Left Column - Images and Quick Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={images[currentImage]}
                  alt={title}
                  className="h-full w-full object-cover"
                  height={450}
                  width={450}
                />
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto p-1">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md",
                      currentImage === index
                        ? "ring-2 ring-blue-500"
                        : "opacity-70 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="h-full w-full object-cover"
                      height={80}
                      width={80}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* // + Quick Info */}
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge>{startCase(replace(category, /-/g, " "))}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">SKU:</span>
                <Badge variant="secondary">{sku}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Availability:</span>
                <Badge variant={stock > 0 ? "secondary" : "destructive"}>
                  {availabilityStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stock:</span>
                <Badge variant="secondary">{stock} units</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* // + Right Column - Main Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                  {brand && <p className="text-sm text-muted-foreground">by {brand}</p>}
                </div>
                <WishlistButton product={product} className="static" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                {/* // + tab items */}
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* // + details tab */}
                <TabsContent value="details" className="space-y-8">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-3xl font-bold">
                          ${discountedPrice.toFixed(2)}
                          {discountPercentage > 0 && (
                            <span className="ml-2 text-lg text-muted-foreground line-through">
                              ${price.toFixed(2)}
                            </span>
                          )}
                        </p>
                        {discountPercentage > 0 && (
                          <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < Math.round(rating) || i < Math.round(averageRating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">Description</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <TagIcon className="h-5 w-5" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* // + specs tab */}
                <TabsContent value="specs" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="mb-2 flex items-center gap-2 font-semibold">
                            <Box className="h-5 w-5" />
                            Dimensions
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>Width: {dimensions.width}cm</p>
                            <p>Height: {dimensions.height}cm</p>
                            <p>Depth: {dimensions.depth}cm</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="space-y-4 p-4">
                          <div>
                            <h4 className="mb-2 flex items-center gap-2 font-semibold">
                              <Scale className="h-5 w-5" />
                              Weight
                            </h4>
                            <p className="text-sm">{weight}kg</p>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="mb-2 flex items-center gap-2 font-semibold">
                              <BarChart className="h-5 w-5" />
                              Barcode
                            </h4>
                            <p className="text-sm">{meta.barcode}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardContent className="space-y-4 p-4">
                        <div>
                          <h4 className="mb-2 flex items-center gap-2 font-semibold">
                            <File className="h-5 w-5" />
                            Warranty Information
                          </h4>
                          <p className="text-sm">{warrantyInformation}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="mb-2 flex items-center gap-2 font-semibold">
                            <Truck className="h-5 w-5" />
                            Shipping Information
                          </h4>
                          <p className="text-sm">{shippingInformation}</p>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="mb-2 flex items-center gap-2 font-semibold">
                            <FileText className="h-5 w-5" />
                            Return Policy
                          </h4>
                          <p className="text-sm">{returnPolicy}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* // + reviews tab */}
                <TabsContent value="reviews" className="space-y-4">
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{review.reviewerName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div
            className={cn(
              "grid py-2 xl:grid-cols-2",
              "sticky bottom-0 z-10 mx-0.5 bg-background/90 backdrop-blur-sm",
            )}
          >
            <AddToCartButton
              product={product}
              className="col-span-full text-background lg:col-span-1"
              variant={"default"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductDetails }

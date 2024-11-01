import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface ImageGalleryProps {
  images: string[]
  title: string
  className?: string
}

const ImageGallery = ({ images, title, className }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  if (!images?.length) {
    return null
  }

  return (
    <div className={cn(className)}>
      {/* // + Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={images[currentImage]}
          alt={title}
          className="h-full w-full object-cover"
          height={450}
          width={450}
          priority={currentImage === 0}
        />
      </div>

      {/* // + Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto p-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md",
                "transition-all duration-200 ease-in-out",
                currentImage === index ? "ring-2 ring-blue-500" : "opacity-70 hover:opacity-100",
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
                height={80}
                width={80}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { ImageGallery }

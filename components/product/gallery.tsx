'use client'
import { ImageType, ProductOptionType } from '@/lib/shopify/types'
import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface GalleryProps {
  images: ImageType[]
  options: ProductOptionType[]
  title: string
}

function productImagesBySelectedColor(images: ImageType[], colorParam: string | null) {
  if (!colorParam) return [images[0]]

  const imagesByColor = images.filter((image) => image.altText?.toLowerCase() === colorParam.toLowerCase())

  return imagesByColor.length > 0 ? imagesByColor : [images[0]]
}

export function Gallery({ images, options, title }: GalleryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const colorSearchParam = searchParams.get('cor')
  const imageSearchParam = searchParams.get('image')
  const hasColorOptions = options.find((option) => option.name.toLocaleLowerCase() === 'cor')
  const productImages = hasColorOptions ? productImagesBySelectedColor(images, colorSearchParam) : images
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0

  return (
    <div className="relative flex h-max w-full justify-center rounded-xl border border-neutral-800 bg-neutral-900 p-10 tablet:p-4">
      {productImages.length > 1 && (
        <ul className="absolute left-8 top-8 z-50 flex flex-col gap-2">
          {productImages?.map((image, index) => {
            const isActive = index === imageIndex
            const imageSearchParams = new URLSearchParams(searchParams.toString())
            imageSearchParams.set('image', index.toString())

            return (
              <li key={image.url}>
                <button
                  onClick={() => router.replace(createUrl(pathname, imageSearchParams), { scroll: false })}
                  data-active={isActive}
                  className="relative flex h-[70px] w-[70px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 hover:border-neutral-600 data-[active=true]:pointer-events-none data-[active=true]:border-blue-600"
                >
                  <Image src={image.url} alt={title} fill style={{ objectFit: 'contain', padding: '8px' }} />
                </button>
              </li>
            )
          })}
        </ul>
      )}
      <div className="relative aspect-[600/600] w-full max-w-[590px]">
        <Image
          src={productImages[imageIndex >= productImages.length || imageIndex < 0 ? 0 : imageIndex].url}
          alt={title}
          fill
          sizes="600px"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

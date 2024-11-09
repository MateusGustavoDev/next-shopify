'use client'
import { ImageType, ProductOptionType } from '@/lib/shopify/fetch/types'
import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface GalleryProps {
  images: ImageType[]
  options: ProductOptionType[]
  title: string
}

function productImagesBySelectedColor(images: ImageType[], colorParam: string | null) {
  if (!colorParam) return [images[0]]

  const imagesByColor = images.filter((image) => image.altText === colorParam)

  return imagesByColor.length > 0 ? imagesByColor : [images[0]]
}

export function Gallery({ images, options, title }: GalleryProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const colorSearchParam = searchParams.get('cor')
  const imageSearchParam = searchParams.get('image')

  const theColorOptionExists = options.find((option) => option.name.toLocaleLowerCase() === 'cor')

  const productImages = theColorOptionExists ? productImagesBySelectedColor(images, colorSearchParam) : images

  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0

  return (
    <div className="relative flex h-max w-full flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 p-10 tablet:p-4">
      <div className="relative aspect-[700/600] w-full">
        <Image
          src={productImages[imageIndex >= productImages.length || imageIndex < 0 ? 0 : imageIndex].url}
          alt={title}
          fill
          sizes="600px"
          style={{ objectFit: 'contain' }}
        />
      </div>
      {productImages.length > 1 && (
        <ul className="mt-6 flex gap-2">
          {productImages?.map((image, index) => {
            const isActive = index === imageIndex
            const imageSearchParams = new URLSearchParams(searchParams.toString())

            imageSearchParams.set('image', index.toString())

            return (
              <li key={image.url}>
                <Link
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  data-active={isActive}
                  className="relative flex h-[80px] w-[80px] items-center justify-center border border-black bg-white p-2 data-[active=true]:pointer-events-none data-[active=true]:border-2"
                >
                  <Image src={image.url} alt={title} fill style={{ objectFit: 'contain', padding: '8px' }} />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

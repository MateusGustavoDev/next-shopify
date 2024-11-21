'use client'
import { ImageType, ProductOptionType } from '@/lib/shopify/types'
import { createUrl } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { useEffect, useState } from 'react'
import { type CarouselApi } from '@/components/ui/carousel'

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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mr-4 flex aspect-[940/640] h-max w-full max-w-[940px] shrink gap-6 px-5 lg:aspect-auto lg:max-w-full lg:gap-4 lg:px-0 xl:flex-col-reverse">
      {productImages.length > 1 && (
        <ul className="flex flex-col gap-2 lg:hidden xl:flex-row xl:justify-center">
          {productImages?.map((image, index) => {
            const isActive = index === imageIndex
            const imageSearchParams = new URLSearchParams(searchParams.toString())
            imageSearchParams.set('image', index.toString())

            return (
              <li key={image.url}>
                <button
                  onClick={() => router.replace(createUrl(pathname, imageSearchParams), { scroll: false })}
                  data-active={isActive}
                  className="relative flex h-[70px] w-[70px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 hover:border-neutral-600 data-[active=true]:pointer-events-none data-[active=true]:border-blue-600 sm:h-[60px] sm:w-[60px]"
                >
                  <Image src={image.url} alt={title} fill style={{ objectFit: 'contain', padding: '8px' }} />
                </button>
              </li>
            )
          })}
        </ul>
      )}
      <div className="relative flex aspect-[824/640] w-full max-w-[824px] items-center rounded-md border border-neutral-800 bg-neutral-900 lg:hidden">
        <Image
          src={productImages[imageIndex >= productImages.length || imageIndex < 0 ? 0 : imageIndex].url}
          alt={title}
          fill
          sizes="600px"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <Carousel
        opts={{
          align: 'center',
        }}
        className="hidden w-full p-0 lg:block"
        setApi={setApi}
      >
        <CarouselContent className="relative -ml-0 w-full">
          {productImages.map((image) => (
            <CarouselItem key={image.url} className="w-full basis-full pl-0">
              <div className="relative flex aspect-[300/300] w-full items-center bg-neutral-900">
                <Image src={image.url} alt={title} fill sizes="600px" style={{ objectFit: 'contain' }} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {productImages.map((image, index) => {
            return (
              <div
                key={image.url}
                data-active={index === current - 1}
                className="h-2 w-2 rounded-full bg-neutral-500 data-[active=true]:bg-blue-600"
              />
            )
          })}
        </div>
      </Carousel>
    </div>
  )
}

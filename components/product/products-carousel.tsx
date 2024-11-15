import Image from 'next/image'
import Link from 'next/link'
import { formatPriceToBrl, calculateDiscount, productVariantUrl } from '@/lib/utils'
import { getCollectionProducts } from '@/app/actions/products'
import { ChevronDown, Flame } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

interface CollectionProps {
  collection: string
}

export async function ProductsCarousel({ collection }: CollectionProps) {
  const data = await getCollectionProducts({ collection: collection })

  if (!data) return null

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="flex w-full flex-col gap-6 lg:gap-4"
    >
      <div className="flex w-full justify-between">
        <div className="item flex w-full items-center justify-between gap-3">
          <p className="w-max border-neutral-900 text-2xl font-semibold text-neutral-300 lg:text-xl">{data.title}</p>
          <Link href={`/collections/${data.handle}`} className="text-sm font-medium text-blue-500 hover:text-blue-600">
            Ver todos
          </Link>
        </div>
        <div className="ml-4 flex w-max items-center gap-4 lg:hidden">
          <CarouselPrevious className="flex h-6 w-6 bg-white text-black" />
          <CarouselNext className="h-6 w-6 bg-white text-black" />
        </div>
      </div>
      <CarouselContent>
        {data.products.map((product) => {
          const firstVariant = product.variants.edges[0].node
          const price = firstVariant.price.amount as string
          const compareAtPrice = firstVariant.compareAtPrice?.amount as string | null
          const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)

          const hasColorOptions = product.options.find((option) => option.name === 'Cor')
          const formattedColorOptions = hasColorOptions?.optionValues.map((color) => ({
            name: color.name,
            color: color.swatch?.color as string,
          }))

          return (
            <CarouselItem
              key={product.id}
              className="group flex-shrink-0 basis-1/4 xl:basis-2/5 [@media(max-width:480px)]:basis-5/6"
            >
              <Link href={productUrl} className="relative flex w-full flex-col">
                <div className="relative flex aspect-[300/300] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700">
                  {formattedColorOptions && (
                    <ul className="absolute right-4 top-4 flex gap-2">
                      {formattedColorOptions.map((color) => (
                        <li
                          key={color.name}
                          className="h-4 w-4 gap-2 rounded-full"
                          style={{ backgroundColor: color.color }}
                        />
                      ))}
                    </ul>
                  )}
                  <Image
                    src={firstVariant.image?.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 800px) 198px, 268px"
                    style={{ objectFit: 'contain' }}
                    className="p-2"
                  />
                </div>
                <div className="flex flex-col gap-1 bg-black p-4 px-2">
                  <p className="text-base font-medium">{product.title}</p>
                  <div className="flex gap-2">
                    <p className="text-base font-semibold text-blue-600">{formatPriceToBrl(price)}</p>
                    {compareAtPrice && compareAtPrice > price && (
                      <p className="text-sm font-normal text-neutral-400 line-through">
                        {formatPriceToBrl(compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>
                {compareAtPrice && compareAtPrice > price && (
                  <div className="absolute left-3 top-3 flex w-max items-center rounded-full bg-blue-600 p-2 py-1 text-sm font-semibold text-white">
                    {`${calculateDiscount(price, compareAtPrice)}% Off`}
                  </div>
                )}
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

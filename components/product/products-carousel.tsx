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
      className="flex w-full flex-col gap-4"
    >
      <div className="flex w-full justify-between">
        <div className="item flex w-max items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2">
            <Flame className="w-5" />
            <p className="w-max text-base font-semibold mobile:text-base">{data.title}</p>
          </div>
          <Link href={`/collections/${data.handle}`} className="text-sm font-medium text-blue-500 hover:text-blue-600">
            Ver todos
          </Link>
        </div>
        <div className="flex w-max items-center gap-4">
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
            <CarouselItem key={product.id} className="group w-full basis-1/4">
              <Link
                href={productUrl}
                className="relative flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-neutral-700"
              >
                <div className="relative flex h-[260px] items-center justify-center tablet:h-[200px]">
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
                    className="p-4 tablet:p-6"
                  />
                </div>
                <div className="border-t border-neutral-800 p-4">
                  <div className="flex w-max items-center gap-2 rounded-full border border-neutral-800 bg-black p-1">
                    <p className="flex text-wrap p-2 text-xs font-semibold">{product.title}</p>
                    <p className="rounded-full bg-blue-600 px-2 py-2 text-xs font-semibold">
                      {formatPriceToBrl(price)}
                    </p>{' '}
                  </div>
                </div>
                {compareAtPrice && compareAtPrice > price && (
                  <div className="absolute left-3 top-3 flex w-max items-center rounded-full bg-blue-600 px-2 text-sm font-semibold text-white">
                    <ChevronDown className="w-5" />
                    {`${calculateDiscount(price, compareAtPrice)}%`}
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

import Image from 'next/image'
import Link from 'next/link'
import { formatPriceToBrl, calculateDiscount, productVariantUrl } from '@/lib/utils'
import { getCollectionProducts } from '@/actions/products'
import { ChevronDown, Flame } from 'lucide-react'
import { DEFAULT_OPTION } from '@/lib/constants'

interface CollectionProps {
  collection: string
}

export async function Carousel({ collection }: CollectionProps) {
  const data = await getCollectionProducts({ collection: collection })

  if (!data) return null

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="item flex w-full items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2">
          <Flame className="w-5" />
          <p className="w-max text-base font-semibold mobile:text-base">{data.title}</p>
        </div>
        <Link
          href={`/collections/${data.title.toLowerCase()}`}
          className="text-sm font-medium text-blue-500 hover:text-blue-600"
        >
          Ver todos
        </Link>
      </div>
      <ul className="flex w-full gap-4">
        {data.products.map((product) => {
          const firstVariant = product.variants.edges[0].node
          const price = firstVariant.price.amount as string
          const compareAtPrice = firstVariant.compareAtPrice?.amount as string | null
          const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)

          return (
            <li key={product.id} className="relative w-[240px]">
              <Link href={productUrl} className="flex flex-col gap-1">
                <div className="relative flex h-[240px] items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 p-4 tablet:h-[200px]">
                  <Image
                    src={firstVariant.image?.url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 800px) 198px, 268px"
                    style={{ objectFit: 'contain' }}
                    className="p-4 tablet:p-6"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <p className="flex w-full text-wrap font-medium">{product.title}</p>
                  {firstVariant.title !== DEFAULT_OPTION && (
                    <p className="text-xs text-neutral-400">{firstVariant.title}</p>
                  )}
                  <div className="flex w-full gap-2">
                    <p className="text-sm font-medium">{formatPriceToBrl(price)}</p>
                    {compareAtPrice && compareAtPrice > price && (
                      <p className="text-xs font-medium text-neutral-300 line-through">
                        {formatPriceToBrl(compareAtPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              {compareAtPrice && compareAtPrice > price && (
                <div className="absolute left-3 top-3 flex w-max items-center rounded-full bg-blue-600 px-2 text-xs font-semibold text-white">
                  <ChevronDown className="w-5" />
                  {`${calculateDiscount(price, compareAtPrice)}%`}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

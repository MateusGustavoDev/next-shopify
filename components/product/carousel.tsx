import Image from 'next/image'
import Link from 'next/link'
import { productFirstVariantUrl, formatPriceToBrl, removeEdgesAndNodes, calculateDiscount } from '@/lib/utils'
import { getCollectionProducts } from '@/actions/products'
import { ArrowDown, Flame } from 'lucide-react'
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
          <span className="w-max text-base font-semibold mobile:text-base">{data.title}</span>
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
          const price = firstVariant.price
          const compareAtPrice = firstVariant.compareAtPrice
          const productUrl = productFirstVariantUrl(removeEdgesAndNodes(product.variants), product.handle)

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
                  <span className="flex w-full text-wrap font-medium">{product.title}</span>
                  {firstVariant.title !== DEFAULT_OPTION && (
                    <span className="text-xs text-neutral-400">{firstVariant.title}</span>
                  )}
                  <div className="flex w-full gap-2">
                    <span className="text-sm font-medium">{formatPriceToBrl(price.amount)}</span>
                    {compareAtPrice?.amount > price.amount && (
                      <span className="text-xs font-medium text-neutral-300 line-through">
                        {formatPriceToBrl(compareAtPrice?.amount)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              {compareAtPrice?.amount > price.amount && (
                <div className="absolute left-3 top-3 flex w-max items-center gap-1 rounded-full bg-blue-600 px-2 text-xs font-medium text-white">
                  <ArrowDown className="w-4" />
                  {`${calculateDiscount(price.amount, compareAtPrice?.amount).toFixed(0)}%`}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

import { ProductType } from '@/lib/shopify/fetch/types'
import { productVariantUrl, formatPriceToBrl, removeEdgesAndNodes } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: ProductType
}

export function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants.edges[0].node
  const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)

  return (
    <Link
      href={productUrl}
      className="relative flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700"
    >
      <div className="relative aspect-[370/320] w-full max-w-[370px] tablet:max-w-full">
        <Image
          src={product.featuredImage?.url}
          alt={product.title}
          fill
          sizes="370px"
          style={{ objectFit: 'contain' }}
          className="p-6"
        />
      </div>
      <div className="w-full border-t border-neutral-800 p-4">
        <div className="flex w-max items-center gap-2 rounded-full border border-neutral-800 bg-black p-1">
          <p className="flex text-wrap p-2 text-xs font-semibold">{product.title}</p>
          <p className="rounded-full bg-blue-600 px-2 py-2 text-xs font-semibold">
            {formatPriceToBrl(firstVariant.price.amount)}
          </p>{' '}
        </div>
      </div>
    </Link>
  )
}

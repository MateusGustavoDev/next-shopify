import { ProductType } from '@/lib/shopify/types'
import { productVariantUrl, formatPriceToBrl, removeEdgesAndNodes } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: ProductType
}

export function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants.edges[0].node
  const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)
  const hasColorOptions = product.options.find((option) => option.name === 'Cor')
  const formattedColorOptions = hasColorOptions?.optionValues.map((color) => ({
    name: color.name,
    color: color.swatch?.color as string,
  }))

  return (
    <Link
      href={productUrl}
      className="relative flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700"
    >
      <div className="relative aspect-[370/320] w-full max-w-[370px] tablet:max-w-full">
        {formattedColorOptions && (
          <ul className="absolute right-4 top-4 flex gap-2">
            {formattedColorOptions.map((color) => (
              <li key={color.name} className="h-4 w-4 gap-2 rounded-full" style={{ backgroundColor: color.color }} />
            ))}
          </ul>
        )}
        <Image
          src={firstVariant.image?.url}
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

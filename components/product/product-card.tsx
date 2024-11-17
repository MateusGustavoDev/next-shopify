import { ProductType } from '@/lib/shopify/types'
import { productVariantUrl, formatPriceToBrl, calculateDiscount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: ProductType
}

export function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants.edges[0].node
  const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)
  const price = firstVariant.price.amount as string
  const compareAtPrice = firstVariant.compareAtPrice?.amount as string | null
  const hasColorOptions = product.options.find((option) => option.name === 'Cor')
  const formattedColorOptions = hasColorOptions?.optionValues.map((color) => ({
    name: color.name,
    color: color.swatch?.color as string,
  }))
  const images = product.images.edges.filter((image) => image.node.altText === firstVariant.image?.altText)

  return (
    <Link href={productUrl} className="group relative flex w-full flex-col">
      <div className="relative flex aspect-[300/300] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
        {formattedColorOptions && (
          <ul className="absolute right-4 top-4 flex gap-2">
            {formattedColorOptions.map((color) => (
              <li key={color.name} className="h-4 w-4 gap-2 rounded-full" style={{ backgroundColor: color.color }} />
            ))}
          </ul>
        )}
        <Image
          src={images[0].node.url}
          alt={product.title}
          fill
          sizes="(max-width: 800px) 198px, 268px"
          style={{ objectFit: 'contain' }}
          className="p-2 group-hover:hidden lg:group-hover:block"
        />
        <Image
          src={images[1].node.url}
          alt={product.title}
          fill
          sizes="(max-width: 800px) 198px, 268px"
          style={{ objectFit: 'contain' }}
          className="hidden p-2 group-hover:block lg:group-hover:hidden"
        />
      </div>
      <div className="flex flex-col gap-1 bg-black p-4 px-2">
        <p className="text-base font-medium">{product.title}</p>
        <div className="flex gap-2">
          <p className="text-base font-semibold text-blue-600">{formatPriceToBrl(price)}</p>
          {compareAtPrice && compareAtPrice > price && (
            <p className="text-sm font-normal text-neutral-400 line-through">{formatPriceToBrl(compareAtPrice)}</p>
          )}
        </div>
      </div>
      {compareAtPrice && compareAtPrice > price && (
        <div className="absolute left-3 top-3 flex w-max items-center rounded-full bg-blue-600 p-2 py-1 text-sm font-semibold text-white">
          {`${calculateDiscount(price, compareAtPrice)}% Off`}
        </div>
      )}
    </Link>
  )
}

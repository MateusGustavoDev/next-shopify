import { ProductType } from '@/lib/shopify/types'
import { productVariantUrl, formatPriceToBrl, calculateDiscount } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
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
    <Link
      href={productUrl}
      className="group relative flex w-full flex-col rounded-lg border border-neutral-800 bg-neutral-900"
    >
      <div className="relative flex aspect-[300/300] items-center justify-center">
        {formattedColorOptions && (
          <ul className="absolute left-4 top-4 flex gap-2">
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
          src={images.length > 1 ? images[1].node.url : images[0].node.url}
          alt={product.title}
          fill
          sizes="(max-width: 800px) 198px, 268px"
          style={{ objectFit: 'contain' }}
          className="hidden p-2 group-hover:block lg:group-hover:hidden"
        />
      </div>
      <div className="flex flex-col gap-1 p-3 pt-0">
        <div className="rounded-neutral-700 flex w-full justify-between rounded-md bg-black px-3 py-2">
          <div className="flex w-max flex-col gap-1 py-1">
            <p className="w-full max-w-[220px] text-sm font-medium">{product.title}</p>
            <div className="flex gap-2">
              <p className="text-sm font-semibold text-neutral-400">{formatPriceToBrl(price)}</p>
              {/* {compareAtPrice && compareAtPrice > price && (
                <p className="text-xs font-normal text-neutral-400 line-through">{formatPriceToBrl(compareAtPrice)}</p>
              )} */}
            </div>
          </div>
          <button className="border-l border-neutral-800 px-3 pl-5">
            <ShoppingCart />
          </button>
        </div>
      </div>
      {compareAtPrice && compareAtPrice > price && (
        <div className="absolute right-3 top-3 flex w-max items-center rounded-full bg-blue-600 p-2 py-1 text-sm font-semibold text-white">
          {`${calculateDiscount(price, compareAtPrice)}% Off`}
        </div>
      )}
    </Link>
  )
}

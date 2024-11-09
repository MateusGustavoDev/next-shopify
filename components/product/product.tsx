import { VariantSelector } from './variant-selector'
import { Description } from './description'
import { AddToCartButton } from '@/components/cart/add-to-cart'
import { Gallery } from './gallery'
import { removeEdgesAndNodes } from '@/lib/utils'
import { Price } from './price'
import { getProductByHandle } from '@/actions/products'
import { notFound } from 'next/navigation'

interface ProductProps {
  handle: string
}

export async function Product({ handle }: ProductProps) {
  const product = await getProductByHandle({ handle: handle })

  if (!product) notFound()

  const price = product.priceRange.minVariantPrice.amount
  const variants = removeEdgesAndNodes(product.variants)
  const images = removeEdgesAndNodes(product.images)
  const options = product.options

  return (
    <div className="relative flex h-max w-full gap-5 tablet:flex-col">
      <Gallery images={images} options={options} title={product.title} />
      <div className="flex w-full max-w-[440px] flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-6 tablet:aspect-auto tablet:max-w-full tablet:gap-10">
        <div>
          <div className="flex flex-col gap-2">
            <span className="block text-sm font-normal text-blue-500">Produto novo | Disponível</span>
            <span className="text-3xl font-bold tablet:text-xl">{product.title}</span>
            <Price amount={price} variants={variants} options={options} />
          </div>
          <VariantSelector variants={variants} options={options} />
          <div className="mt-10 flex flex-col gap-4">
            <p className="font-semibold text-neutral-300">Descrição</p>
            <p className="text-sm font-normal leading-7 text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo.
              Sed sollicitudin velit dolor, ut gravida odio iaculis a. Nulla risus justo, tempor eu felis eu, efficitur
              pulvinar risus. Sed viverra, nisi id egestas convallis.
            </p>
          </div>
        </div>
        <AddToCartButton variants={variants} availableForSale={product.availableForSale} />
      </div>
    </div>
  )
}

import { VariantSelector } from './variant-selector'
import { AddToCartButton } from '@/components/cart/add-to-cart'
import { Gallery } from './gallery'
import { removeEdgesAndNodes } from '@/lib/utils'
import { Price } from './price'
import { getProductByHandle } from '@/app/actions/products'
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
  const productCondition = product.metafields.find((metafild) => metafild?.key === 'condition')

  return (
    <div className="relative flex w-full justify-between lg:flex-col">
      <Gallery images={images} options={options} title={product.title} />
      <div className="flex min-h-[640px] w-[400px] flex-col justify-between lg:mt-5 lg:min-h-max lg:w-full lg:justify-start lg:px-5">
        <div>
          <div className="flex flex-col gap-3">
            <span className="block text-sm font-normal text-blue-500">
              {productCondition ? `${productCondition.value} |` : null}{' '}
              {product.availableForSale ? 'Disponível' : 'Indisponível'}
            </span>
            <span className="tablet:text-xl text-3xl font-bold">{product.title}</span>
            <Price amount={price} variants={variants} options={options} />
          </div>
          <VariantSelector variants={variants} options={options} />
          <div className="mt-10 flex flex-col gap-4 lg:mt-7">
            <p className="font-semibold text-neutral-300">Descrição</p>
            <p className="text-sm font-normal leading-7 text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo.
              Sed sollicitudin velit dolor, ut gravida odio iaculis a. Nulla risus justo, tempor eu felis eu, efficitur
              pulvinar risus. Sed viverra, nisi id egestas convallis.
            </p>
          </div>
        </div>
        <div className="flex gap-4 lg:mt-8">
          <AddToCartButton variants={variants} availableForSale={product.availableForSale} />
        </div>
      </div>
    </div>
  )
}

'use client'
import { ProductOptionType, ProductVariantType } from '@/lib/shopify/types'
import { calculateDiscount, formatPriceToBrl } from '@/lib/utils'
import { ArrowDown, ChevronDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface PriceProps {
  amount: string
  variants: ProductVariantType[]
  options: ProductOptionType[]
}

type ParamsObj = {
  [key: string]: string | boolean
}

export function Price({ amount, variants, options }: PriceProps) {
  const searchParams = useSearchParams()
  let price: string

  const paramsObj: ParamsObj = {}

  options.forEach((option) => {
    const paramValue = searchParams.get(option.name.toLowerCase())
    if (paramValue && option.optionValues.some((option) => option.name === paramValue)) {
      paramsObj[option.name] = paramValue
    }
  })

  const matchedVariant = variants.find((variant) => {
    return variant.selectedOptions.every((option) => {
      return paramsObj[option.name] === option.value
    })
  })

  price = matchedVariant ? matchedVariant.price.amount : amount

  return (
    <div className="flex gap-2">
      <span className="text-2xl font-semibold text-neutral-300 tablet:text-xl">{formatPriceToBrl(price)}</span>
      {matchedVariant?.compareAtPrice?.amount > price && (
        <span className="text-sm font-semibold text-neutral-400 line-through">
          {formatPriceToBrl(matchedVariant?.compareAtPrice?.amount)}
        </span>
      )}
    </div>
  )
}

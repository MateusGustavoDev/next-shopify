'use client'
import { addProductToCartAction } from '@/app/actions/cart'
import { ProductVariantType } from '@/lib/shopify/types'
import { useSearchParams } from 'next/navigation'
import { ActionButton } from '../action-button'
import { ShoppingBag } from 'lucide-react'

interface AddToCartProps {
  variants: ProductVariantType[]
  availableForSale: boolean | undefined
}

export function AddToCartButton({ variants, availableForSale }: AddToCartProps) {
  const searchParams = useSearchParams()
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined

  const variant = variants.find((variant) =>
    variant.selectedOptions.every((option) => option.value === searchParams.get(option.name.toLowerCase())),
  )

  const selectedVariantId = variant?.id || defaultVariantId

  if (!availableForSale) {
    return (
      <ActionButton full disabled>
        Produto indisponível
      </ActionButton>
    )
  }

  if (!selectedVariantId) {
    return (
      <ActionButton full disabled>
        Selecione a variante
      </ActionButton>
    )
  }

  if (variant && !variant.availableForSale) {
    return (
      <ActionButton full disabled>
        Variante não disponível
      </ActionButton>
    )
  }

  async function handleAddProductToCart() {
    const { errors } = await addProductToCartAction(selectedVariantId as string)
    if (errors) alert(errors.message)
  }

  return (
    <form action={handleAddProductToCart} className="w-full">
      <ActionButton full size="md" icon={ShoppingBag}>
        Adicionar ao Carrinho
      </ActionButton>
    </form>
  )
}

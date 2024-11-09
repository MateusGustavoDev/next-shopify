import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { ProductVariantType } from './shopify/fetch/types'
import { DEFAULT_OPTION } from './constants'
import { SelectedOption } from './shopify/graphql/generated/storefront.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export function formatPriceToBrl(price: string | number): string {
  const priceNumber = Number(price)
  return priceNumber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function productFirstVariantUrl(variants: ProductVariantType[], productHandle: string) {
  const firstVariant = variants[0]

  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) => option.name === 'Title' && option.value === DEFAULT_OPTION,
    ),
  )

  if (firstVariantIsDefault) return `/product/${productHandle}`

  const queryParams = firstVariant.selectedOptions
    .map((option) => {
      const paramName = option.name.toLowerCase()
      let paramValue = encodeURIComponent(option.value)
      paramValue = paramValue.replace(/%20/g, '+')
      return `${paramName}=${paramValue}`
    })
    .join('&')

  return `/product/${productHandle}?${queryParams}`
}

export function calculateDiscount(price1: number, price2: number): number {
  const discount = ((price1 - price2) / price1) * 100
  return Math.abs(discount)
}

type Connection<T> = {
  edges: Array<Edge<T>>
}

type Edge<T> = {
  node: T
}

export const removeEdgesAndNodes = <T>(array: Connection<T>) => {
  return array.edges.map((edge) => edge?.node)
}

export function formateDateToBr(dataISO: string) {
  const data = new Date(dataISO)

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data)
}

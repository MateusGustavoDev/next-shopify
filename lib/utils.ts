import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { SelectedOptionsType } from './shopify/types'
import { DEFAULT_OPTION } from './constants'

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

export function productVariantUrl(selectedOptions: SelectedOptionsType, productHandle: string) {
  if (selectedOptions.length === 1 && selectedOptions[0].value === DEFAULT_OPTION) return `/product/${productHandle}`

  const queryParams = selectedOptions
    .map((option) => {
      const paramName = option.name.toLowerCase()
      let paramValue = encodeURIComponent(option.value)
      paramValue = paramValue.replace(/%20/g, '+')
      return `${paramName}=${paramValue}`
    })
    .join('&')

  return `/product/${productHandle}?${queryParams}`
}

export function calculateDiscount(price1: number | string, price2: number | string): string {
  const price1Number = Number(price1)
  const price2Number = Number(price2)

  const discount = ((price1Number - price2Number) / price1Number) * 100
  return Math.abs(discount).toFixed(0)
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

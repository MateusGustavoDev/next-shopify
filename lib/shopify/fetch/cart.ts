import 'server-only'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { ERROR_MESSAGES, TAGS } from '@/lib/constants'
import { ActionStateType, CartType } from '../types'
import { AddCartLinesMutation, CartQueryQuery, CreateCartMutation, EditCartItemsMutation } from '../graphql/generated'
import { createCartMutation } from '../graphql/mutations/create-cart'
import { getCartQuery } from '../graphql/queries/get-cart'
import { addCartLinesMutation } from '../graphql/mutations/add-cart-lines'
import { editCartItemsMutation } from '../graphql/mutations/add-cart-items'

export async function createCart(): Promise<CartType | undefined> {
  const { data, errors } = await shopifyFetch<CreateCartMutation>({ query: createCartMutation })

  if (!data?.cartCreate?.cart || errors || data.cartCreate.userErrors[0]) {
    return undefined
  }

  const formattedLines = data.cartCreate.cart.lines.edges.map((item) => ({
    id: item.node.id,
    quantity: item.node.quantity,
    merchandise: {
      id: item.node.merchandise.id,
      title: item.node.merchandise.title,
      selectedOptions: item.node.merchandise.selectedOptions,
      product: item.node.merchandise.product,
    },
  }))

  return {
    id: data.cartCreate.cart.id,
    createdAt: data.cartCreate.cart.createdAt,
    updateAt: data.cartCreate.cart.updatedAt,
    checkoutUrl: data.cartCreate.cart.checkoutUrl,
    totalQuantity: data.cartCreate.cart.totalQuantity,
    cost: data.cartCreate.cart.cost,
    lines: formattedLines,
  }
}

export async function getCart(cartId: string): Promise<CartType | undefined> {
  const { data, errors } = await shopifyFetch<CartQueryQuery>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  })

  if (!data?.cart || errors) {
    return undefined
  }

  const formattedLines = data.cart.lines.edges.map((item) => ({
    id: item.node.id,
    quantity: item.node.quantity,
    merchandise: {
      id: item.node.merchandise.id,
      title: item.node.merchandise.title,
      selectedOptions: item.node.merchandise.selectedOptions,
      product: item.node.merchandise.product,
    },
  }))

  return {
    id: data.cart.id,
    createdAt: data.cart.createdAt,
    updateAt: data.cart.updatedAt,
    checkoutUrl: data.cart.checkoutUrl,
    totalQuantity: data.cart.totalQuantity,
    cost: data.cart.cost,
    lines: formattedLines,
  }
}

export async function addCartLine(cartId: string, merchandiseId: string): Promise<ActionStateType> {
  const { data, errors } = await shopifyFetch<AddCartLinesMutation>({
    query: addCartLinesMutation,
    variables: { cartId: cartId, lines: { merchandiseId: merchandiseId, quantity: 1 } },
    cache: 'no-store',
  })

  if (!data?.cartLinesAdd || errors) {
    return { errors: { message: ERROR_MESSAGES.addProductToCart } }
  }

  if (data.cartLinesAdd.userErrors[0]) {
    return {
      errors: { message: data.cartLinesAdd.userErrors[0].message },
    }
  }

  return { errors: undefined }
}

type Lines = {
  id: string
  merchandiseId: string
  quantity: number
}[]

export async function updateCart(cartId: string, lines: Lines): Promise<ActionStateType> {
  const { data, errors } = await shopifyFetch<EditCartItemsMutation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: 'no-store',
  })

  if (!data?.cartLinesUpdate?.cart || errors) {
    return { errors: { message: ERROR_MESSAGES.updateCart } }
  }

  if (data.cartLinesUpdate.userErrors[0]) {
    return { errors: { message: data.cartLinesUpdate.userErrors[0].message } }
  }

  return { errors: undefined }
}

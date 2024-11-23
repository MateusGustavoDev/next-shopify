'use server'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { CollectionProductsType, PageInfoType, ProductType } from '@/lib/shopify/types'
import { removeEdgesAndNodes } from '@/lib/utils'
import { TAGS } from '@/lib/constants'
import {
  GetCollectionProductsQuery,
  GetProductByHandleQuery,
  GetProductsAndVariantsQuery,
  ProductRecommendationsQuery,
} from '@/lib/shopify/graphql/generated'
import { getCollectionProductsQuery } from '@/lib/shopify/graphql/queries/get-collection-products'
import { getProductByHandleQuery } from '@/lib/shopify/graphql/queries/get-products-by-handle'
import { getAllProductsQuery } from '@/lib/shopify/graphql/queries/get-all-products'
import { getProductRecommendationsQuery } from '@/lib/shopify/graphql/queries/get-recommendations'

type GetCollectionProducts = {
  collection: string
  cursor?: string
}

export async function getCollectionProducts({
  collection,
  cursor,
}: GetCollectionProducts): Promise<CollectionProductsType | undefined> {
  const { data, errors } = await shopifyFetch<GetCollectionProductsQuery>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections],
    variables: {
      handle: collection,
      cursor: cursor,
    },
  })

  if (!data?.collection || errors) {
    return undefined
  }

  return {
    title: data.collection.title,
    handle: data.collection.handle,
    products: removeEdgesAndNodes(data.collection.products),
    pageInfo: data.collection.products.pageInfo,
  }
}

export async function getProductByHandle({ handle }: { handle: string }): Promise<ProductType | undefined> {
  const { data, errors } = await shopifyFetch<GetProductByHandleQuery>({
    query: getProductByHandleQuery,
    tags: [TAGS.products],
    variables: {
      handle: handle,
    },
  })

  if (!data?.product || errors) {
    return undefined
  }

  return data.product
}

type GetAllProductsType = {
  products: ProductType[]
  pageInfo: PageInfoType
}

export async function getAllProducts({ cursor }: { cursor: string }): Promise<GetAllProductsType | undefined> {
  const { data, errors } = await shopifyFetch<GetProductsAndVariantsQuery>({
    query: getAllProductsQuery,
    tags: [TAGS.products],
    variables: {
      cursor: cursor,
    },
  })

  if (!data?.products || errors) {
    return undefined
  }

  return {
    products: removeEdgesAndNodes(data.products),
    pageInfo: data.products.pageInfo,
  }
}

export async function getProductRecommendations(productHandle: string) {
  const { data, errors } = await shopifyFetch<ProductRecommendationsQuery>({
    query: getProductRecommendationsQuery,
    variables: {
      productHandle: productHandle,
    },
  })

  if (!data?.productRecommendations || errors) return undefined

  return data.productRecommendations
}

'use server'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { CollectionProductType, ProductType } from '@/lib/shopify/fetch/types'
import { removeEdgesAndNodes } from '@/lib/utils'
import { TAGS } from '@/lib/constants'
import {
  GetCollectionProductsQuery,
  GetProductByHandleQuery,
  GetProductByHandleQueryVariables,
  GetProductsAndVariantsQuery,
  PageInfo,
} from '@/lib/shopify/graphql/generated'
import {
  getAllProductsQuery,
  getCollectionProductsQuery,
  getProductByHandleQuery,
} from '@/lib/shopify/graphql/queries/products'

type GetCollectionProducts = {
  collection: string
  cursor?: string
}

export async function getCollectionProducts({
  collection,
  cursor,
}: GetCollectionProducts): Promise<CollectionProductType | undefined> {
  const { data, errors } = await shopifyFetch<GetCollectionProductsQuery>({
    query: getCollectionProductsQuery,
    tags: [TAGS.products],
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
  pageInfo: PageInfo
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

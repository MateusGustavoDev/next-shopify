'use server'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { SearchProductsType } from '@/lib/shopify/fetch/types'
import { SearchProductsQuery } from '@/lib/shopify/graphql/generated'
import { searchProductsQuery } from '@/lib/shopify/graphql/queries/search-products'
import { removeEdgesAndNodes } from '@/lib/utils'

type SearchProductsAction = {
  query: string
  cursor?: string
  numOfResults?: number
}

export async function searchProductsAction({
  query,
  cursor,
  numOfResults,
}: SearchProductsAction): Promise<SearchProductsType | undefined> {
  const { data, errors } = await shopifyFetch<SearchProductsQuery>({
    query: searchProductsQuery,
    variables: {
      query: query,
      cursor: cursor,
      numOfResults: numOfResults ? numOfResults : 5,
    },
  })

  if (!data?.search || errors) {
    return undefined
  }

  return {
    products: removeEdgesAndNodes(data.search),
    pageInfo: data.search.pageInfo,
  }
}

'use server'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { ProductType, SearchProductsType } from '@/lib/shopify/types'
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
      numOfResults: numOfResults ? numOfResults : 9,
    },
  })

  if (!data?.search || errors) {
    return undefined
  }

  return {
    products: removeEdgesAndNodes(data.search) as ProductType[],
    pageInfo: data.search.pageInfo,
  }
}

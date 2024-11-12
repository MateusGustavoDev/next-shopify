import 'server-only'
import { TAGS } from '@/lib/constants'

import { shopifyFetch } from './shopify-fetch'
import { CollectionsType } from './types'
import { GetCollectionsQuery } from '../graphql/generated'
import { getCollectionsQuery } from '../graphql/queries/get-collections'

export async function getCollections(): Promise<CollectionsType | undefined> {
  const { data, errors } = await shopifyFetch<GetCollectionsQuery>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  })

  if (!data?.collections || errors) {
    return undefined
  }

  const formattedData = data.collections.edges.map((data) => ({
    cursor: data.cursor,
    id: data.node.id,
    title: data.node.title,
    handle: data.node.handle,
  }))

  return { collections: formattedData }
}

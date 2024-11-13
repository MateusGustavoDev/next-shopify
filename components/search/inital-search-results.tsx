import { searchProductsAction } from '@/app/actions/search'
import { SearchResults } from './search-results'
import { notFound } from 'next/navigation'

export async function InitialSearchResults({ query }: { query: string | undefined }) {
  const data = await searchProductsAction({ query: query ? query : '' })

  if (!data) notFound()

  return <SearchResults data={data} query={query} />
}

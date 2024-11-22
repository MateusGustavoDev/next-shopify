import { InitialSearchResults } from '@/components/search/inital-search-results'
import { ProductListSkeleton } from '@/components/skeletons/product-list'
import { Suspense } from 'react'

type SearchParams = Promise<{ query: string | undefined }>

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams.query

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <InitialSearchResults query={query} />
    </Suspense>
  )
}

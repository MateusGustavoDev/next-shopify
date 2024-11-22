import { ProductFilter, ProductFilterMobile } from '@/components/collections/product-filter'
import { InitialSearchResults } from '@/components/search/inital-search-results'
import { ProductListSkeleton } from '@/components/skeletons/product-list'
import { Wrapper } from '@/components/wrapper'
import { Suspense } from 'react'

type SearchParams = Promise<{ query: string | undefined }>

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams.query

  return (
    <Wrapper className="mt-10 flex gap-4 lg:mt-5 lg:flex-col">
      <div className="h-max w-max shrink-0 lg:hidden">
        <ProductFilter />
      </div>
      <div className="hidden lg:block">
        <ProductFilterMobile />
      </div>
      <div className="w-full">
        <Suspense fallback={<ProductListSkeleton />}>
          <InitialSearchResults query={query} />
        </Suspense>
      </div>
    </Wrapper>
  )
}

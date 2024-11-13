'use client'
import { searchProductsAction } from '@/app/actions/search'
import { useState } from 'react'
import { SearchProductsType } from '@/lib/shopify/types'
import { ProductList } from '../collections/product-list'

interface SearchResultsProps {
  data: SearchProductsType
  query: string | undefined
}

export function SearchResults({ data, query }: SearchResultsProps) {
  const [products, setProducts] = useState(data.products)
  const [endCursor, setEndCursor] = useState(data.pageInfo.endCursor)
  const [hasNextPage, setHasNextPage] = useState(data.pageInfo.hasNextPage)

  async function handleOnLoadMore() {
    const data = await searchProductsAction({
      query: query ? query : '',
      cursor: endCursor ? endCursor : undefined,
    })

    if (data) {
      setProducts([...products, ...data.products])
      setEndCursor(data.pageInfo.endCursor)
      setHasNextPage(data.pageInfo.hasNextPage)
    }
  }

  if (products && products?.length <= 0) {
    return (
      <div className="m-auto my-10 w-max text-black">
        Nenhum resultado para: <strong>{query}</strong>
      </div>
    )
  }

  return <ProductList products={products} onLoadMore={handleOnLoadMore} hasNextPage={hasNextPage} />
}

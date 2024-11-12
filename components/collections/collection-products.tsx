'use client'
import { getCollectionProducts } from '@/actions/products'
import { CollectionProductsType } from '@/lib/shopify/fetch/types'
import { useState } from 'react'
import { ProductList } from './product-list'

interface CollectionProductsProps {
  collection: CollectionProductsType
}

export function CollectionProducts({ collection }: CollectionProductsProps) {
  const [products, setProducts] = useState(collection.products)
  const [endCursor, setEndCursor] = useState(collection.pageInfo.endCursor)
  const [hasNextPage, setHasNextPage] = useState(collection.pageInfo.hasNextPage)

  async function handleOnLoadMore() {
    const data = await getCollectionProducts({
      collection: collection.title,
      cursor: endCursor ? endCursor : '',
    })
    if (data?.products) {
      setProducts([...products, ...data.products])
      setEndCursor(data.pageInfo.endCursor)
      setHasNextPage(data.pageInfo.hasNextPage)
    }
  }

  return <ProductList products={products} onLoadMore={handleOnLoadMore} hasNextPage={hasNextPage} />
}

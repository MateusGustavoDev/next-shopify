import { InitialCollectionProducts } from '@/components/collections/initial-collection-products'
import { ProductFilter, ProductFilterMobile } from '@/components/collections/product-filter'
import { ProductListSkeleton } from '@/components/skeletons/product-list'
import { Wrapper } from '@/components/wrapper'
import { Suspense } from 'react'

const { SITE_NAME } = process.env

export async function generateMetadata({ params }: Props) {
  const handle = (await params).handle

  return {
    title: `${handle} | ${SITE_NAME}`,
  }
}

interface Props {
  params: Promise<{ handle: string }>
}

export default async function CollectionPage({ params }: Props) {
  const handle = (await params).handle

  return (
    <div className="mt-10 lg:mt-5">
      <Wrapper className="flex gap-4 lg:flex-col">
        <div className="h-max shrink-0 lg:hidden">
          <ProductFilter />
        </div>
        <div className="hidden lg:block">
          <ProductFilterMobile />
        </div>
        <Suspense fallback={<ProductListSkeleton />}>
          <InitialCollectionProducts handle={handle} />
        </Suspense>
      </Wrapper>
    </div>
  )
}

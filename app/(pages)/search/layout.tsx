import { ReactNode, Suspense } from 'react'
import ChildrenWrapper from './children-wrapper'
import { SearchPageLayoutSkeleton } from '@/components/skeletons/search'
import { Wrapper } from '@/components/wrapper'
import { ProductFilter, ProductFilterMobile } from '@/components/collections/product-filter'

export default function SearchPageLayout({ children }: { children: ReactNode }) {
  return (
    <Wrapper className="mt-10 flex gap-4 lg:mt-5 lg:flex-col">
      <div className="h-max w-max shrink-0 lg:hidden">
        <ProductFilter />
      </div>
      <div className="hidden lg:block">
        <ProductFilterMobile />
      </div>
      <div className="w-full">
        <Suspense fallback={<SearchPageLayoutSkeleton />}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </div>
    </Wrapper>
  )
}

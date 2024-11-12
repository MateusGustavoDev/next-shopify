import { Product } from '@/components/product/product'
import { getProductByHandle } from '@/app/actions/products'
import { Suspense } from 'react'
import { ProductSkeleton } from '@/components/skeletons/product'
import { Wrapper } from '@/components/wrapper'

const { SITE_NAME } = process.env

export async function generateMetadata({ params }: Props) {
  const handle = (await params).handle
  const product = await getProductByHandle({ handle: handle })

  return {
    title: `${product?.title} | ${SITE_NAME}`,
  }
}

interface Props {
  params: Promise<{ handle: string }>
}

export default async function ProductPage({ params }: Props) {
  const handle = (await params).handle

  return (
    <Wrapper>
      <div className="mt-14 w-full">
        <Suspense fallback={<ProductSkeleton />}>
          <Product handle={handle} />
        </Suspense>
      </div>
    </Wrapper>
  )
}

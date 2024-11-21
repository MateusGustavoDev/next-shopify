import { ProductsCarousel } from '@/components/product/products-carousel'
import { CarouselSkeleton } from '@/components/skeletons/carousel'
import { Wrapper } from '@/components/wrapper'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
const { SITE_NAME } = process.env
import banner from '@/app/public/banner.png'
import banner_mobile from '@/app/public/banner-mobile.png'
import banner_fones from '@/app/public/banner-fones.png'
import banner_fones_mobile from '@/app/public/banner-fones -mobile.png'

export const metadata: Metadata = {
  title: SITE_NAME,
}

export default function HomePage() {
  return (
    <Wrapper>
      <div className="relative mt-5 aspect-[1400/400] w-full overflow-hidden rounded-md border-neutral-700 lg:aspect-[992/400]">
        <Image fill src={banner} alt="" className="lg:hidden" />
        <Image fill src={banner_mobile} alt="" className="hidden lg:block" />
      </div>
      <div className="mt-10">
        <div className="flex w-full flex-col gap-5">
          <Suspense fallback={<CarouselSkeleton />}>
            <ProductsCarousel collection="mais-vendidos" />
          </Suspense>
          <div className="relative aspect-[1400/400] w-full overflow-hidden rounded-md border-neutral-700 lg:mt-0 lg:aspect-[992/400]">
            <Image fill src={banner_fones} alt="" />
            <Image fill src={banner_fones_mobile} alt="" className="hidden lg:block" />
          </div>
          <Suspense fallback={<CarouselSkeleton />}>
            <ProductsCarousel collection="Watches" />
          </Suspense>
        </div>
      </div>
    </Wrapper>
  )
}

import { Carousel } from '@/components/product/carousel'
import { CarouselSkeleton } from '@/components/skeletons/carousel'
import { Wrapper } from '@/components/wrapper'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
const { SITE_NAME } = process.env
import banner from '@/app/public/banner.png'

export const metadata: Metadata = {
  title: SITE_NAME,
}

export default function HomePage() {
  return (
    <Wrapper>
      <div className="relative mt-10 h-[342px] w-full border-neutral-700">
        <Image fill src={banner} alt="" />
      </div>
      <div className="mt-10">
        <div className="flex w-full flex-col gap-16">
          <div className="flex w-full flex-col gap-20">
            <Suspense fallback={<CarouselSkeleton />}>
              <Carousel collection="mais-vendidos" />
            </Suspense>
            <Suspense fallback={<CarouselSkeleton />}>
              <Carousel collection="Watches" />
            </Suspense>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

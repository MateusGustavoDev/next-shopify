import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { getProductRecommendations } from '@/app/actions/products'
import { ProductCard } from './product-card'
import { resolve } from 'path'

export async function Recommendations({ productHandle }: { productHandle: string }) {
  const data = await getProductRecommendations(productHandle)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!data) return null

  return (
    <div className="flex w-full flex-col gap-7">
      <p className="w-max border-neutral-900 text-center text-2xl font-semibold text-neutral-300 lg:text-xl">
        Você Pode Gostar
      </p>
      <Carousel
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {data.map((product) => {
            return (
              <CarouselItem key={product.id} className="group w-full basis-1/4 lg:basis-5/6">
                <ProductCard product={product} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

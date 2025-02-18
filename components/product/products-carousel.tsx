import Link from 'next/link'
import { getCollectionProducts } from '@/app/actions/products'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { ProductCard } from './product-card'

interface CollectionProps {
  collection: string
}

export async function ProductsCarousel({ collection }: CollectionProps) {
  const data = await getCollectionProducts({ collection: collection })

  if (!data) return null

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex w-full justify-between">
        <div className="item flex w-full items-center justify-between gap-3">
          <p className="w-max border-neutral-900 text-2xl font-bold uppercase text-neutral-300 lg:text-xl">
            {data.title}
          </p>
          <Link href={`/collections/${data.handle}`} className="text-sm font-medium text-blue-500 hover:text-blue-600">
            Ver Todos
          </Link>
        </div>
        <div className="ml-6 flex w-max items-center gap-4 lg:hidden">
          <CarouselPrevious className="flex h-6 w-6 rounded-md bg-white text-black" />
          <CarouselNext className="h-6 w-6 rounded-md bg-white text-black" />
        </div>
      </div>
      <CarouselContent className="-ml-3">
        {data.products.map((product) => {
          return (
            <CarouselItem
              key={product.id}
              className="group flex-shrink-0 basis-1/4 pl-3 xl:basis-2/5 [@media(max-width:992px)]:basis-[60%] [@media(max-width:600px)]:[@media(max-width:992px)]:basis-[90%]"
            >
              <ProductCard product={product} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

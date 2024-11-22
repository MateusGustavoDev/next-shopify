import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Skeleton } from '../ui/skeleton'

export function CarouselSkeleton() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex w-full justify-between">
        <div className="item flex w-full items-center justify-between gap-3">
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
      <CarouselContent className="-ml-3">
        {[...Array(4)].map((_, index) => (
          <CarouselItem
            key={index}
            className="roup flex-shrink-0 basis-1/4 pl-3 xl:basis-2/5 [@media(max-width:992px)]:basis-[60%] [@media(max-width:600px)]:[@media(max-width:992px)]:basis-[90%]"
          >
            <Skeleton className="aspect-[340/420] w-full rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

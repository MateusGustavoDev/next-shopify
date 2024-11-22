import { Skeleton } from '../ui/skeleton'
import { ProductCardSkeleton } from './product-card'

export function ProductListSkeleton() {
  return (
    <div className="flex w-full max-w-[1138px] flex-col justify-center">
      <ul className="grid w-full grid-cols-3 gap-5 sm:grid-cols-1 xl:grid-cols-2 sm:xl:grid-cols-1">
        {[...Array(8)].map((_, index) => (
          <li key={index}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}

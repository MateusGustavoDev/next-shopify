import { Skeleton } from '../ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Skeleton className="group relative flex w-full flex-col rounded-lg border border-neutral-800 bg-neutral-900">
      <div className="relative flex aspect-[300/300] items-center justify-center" />
      <div className="flex h-20 flex-col gap-1 p-3 pt-0" />
    </Skeleton>
  )
}

import { Skeleton } from '../ui/skeleton'

export function ProductSkeleton() {
  return (
    <div className="relative flex w-full justify-between lg:flex-col">
      <div className="mr-4 flex aspect-[940/640] h-max w-full max-w-[940px] flex-shrink gap-6 px-5 lg:aspect-auto lg:max-w-full lg:gap-4 lg:px-0 xl:flex-col-reverse">
        <ul className="flex flex-col gap-2 lg:hidden xl:flex-row xl:justify-center">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="flex h-[90px] w-[90px] rounded-lg sm:h-[60px] sm:w-[60px]" />
          ))}
        </ul>
        <Skeleton className="aspect-[824/640] w-full max-w-[824px] rounded-md lg:hidden" />
      </div>
      <div className="relative hidden aspect-[300/300] w-full bg-neutral-900 lg:block" />
      <div className="mx-3 flex min-h-[540px] w-[440px] flex-col justify-between rounded-md px-5 lg:mx-0 lg:mt-5 lg:min-h-max lg:w-full lg:justify-start lg:px-4">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-[150px] rounded-md" />
            <Skeleton className="h-9 w-[60%] rounded-md" />
            <Skeleton className="h-8 w-[140px] rounded-md" />
          </div>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 w-[90px] rounded-md" />
              <div className="flex gap-3">
                <Skeleton className="0 h-9 w-9 rounded-full" />
                <Skeleton className="0 h-9 w-9 rounded-full" />
                <Skeleton className="0 h-9 w-9 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 w-[90px] rounded-md" />
              <div className="flex gap-3">
                <Skeleton className="0 h-8 w-[70px] rounded-full" />
                <Skeleton className="0 h-8 w-[70px] rounded-full" />
                <Skeleton className="0 h-8 w-[70px] rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="mt-10 h-10 w-full rounded-md" />
      </div>
    </div>
  )
}

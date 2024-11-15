import { InitialCollectionProducts } from '@/components/collections/initial-collection-products'
import { ProductListSkeleton } from '@/components/skeletons/product-list'
import { Wrapper } from '@/components/wrapper'
import { Filter } from 'lucide-react'
import { Suspense } from 'react'

const { SITE_NAME } = process.env

export async function generateMetadata({ params }: Props) {
  const handle = (await params).handle

  return {
    title: `${handle} | ${SITE_NAME}`,
  }
}

interface Props {
  params: Promise<{ handle: string }>
}

export default async function CollectionPage({ params }: Props) {
  const handle = (await params).handle

  return (
    <div className="mt-10">
      <Wrapper className="flex gap-4">
        <div className="h-full w-full max-w-[300px] rounded-lg border border-neutral-800">
          <div className="flex gap-2 p-4 font-semibold">
            <Filter className="w-5" />
            <p>Filtrar e classificar</p>
          </div>
          <div className="flex flex-col gap-2 border-t border-neutral-800 p-4">
            <span className="text-sm">Ordenar por</span>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
                Recentes
              </button>
              <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
                Preço Maior {'>'} Menor
              </button>
              <button className="rounded-sm border border-neutral-800 bg-neutral-900 px-3 py-1 text-start text-sm text-neutral-300 hover:bg-neutral-800">
                Preço Menor {'>'} Maior
              </button>
            </div>
          </div>
        </div>
        <Suspense fallback={<ProductListSkeleton />}>
          <InitialCollectionProducts handle={handle} />
        </Suspense>
      </Wrapper>
    </div>
  )
}

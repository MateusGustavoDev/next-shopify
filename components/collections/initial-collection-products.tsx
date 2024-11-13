import { notFound } from 'next/navigation'
import { getCollectionProducts } from '@/app/actions/products'
import { CollectionProducts } from './collection-products'

export async function InitialCollectionProducts({ handle }: { handle: string }) {
  const collection = await getCollectionProducts({ collection: handle })

  if (!collection) notFound()

  return <CollectionProducts collection={collection} />
}

'use client'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { LoaderCircle, Search, SearchIcon, X } from 'lucide-react'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { ProductType } from '@/lib/shopify/types'
import { formatPriceToBrl, productVariantUrl, removeEdgesAndNodes } from '@/lib/utils'
import { searchProductsAction } from '@/app/actions/search'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { DEFAULT_OPTION } from '@/lib/constants'

export function SearchModal() {
  const [inputValue, setInputValue] = useState('')
  const [searchResults, setSearchResults] = useState<ProductType[] | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    setRecentSearches(JSON.parse(localStorage.getItem('recentSearches') || '[]'))
  }, [])

  useEffect(() => {
    if (inputValue !== '') {
      const timeoutId = setTimeout(async () => {
        setSearchResults(null)
        startTransition(async () => {
          const products = await searchProductsAction({ query: inputValue, numOfResults: 4 })
          if (products) {
            setSearchResults(products.products)
          }
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
    setSearchResults(null)
  }, [inputValue])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsOpen(false)
    setInputValue('')

    let recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]')

    if (!recentSearches.includes(inputValue) && inputValue !== '') {
      recentSearches.push(inputValue)
    }

    if (recentSearches.length > 5) {
      recentSearches.shift()
    }

    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

    setRecentSearches(recentSearches.reverse())

    router.push(inputValue ? `/search?query=${inputValue}` : '/search')
  }

  function handleClearRecentSearch(search: string) {
    let recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const filteredSearches = recentSearches.filter((item) => item !== search)

    localStorage.setItem('recentSearches', JSON.stringify(filteredSearches))
    setRecentSearches(filteredSearches)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <button aria-label="Pesquisar produto" className="outline-none">
          <SearchIcon className="w-7 text-neutral-400 hover:text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="fixed left-1/2 top-20 z-50 w-full max-w-[700px] -translate-x-1/2 translate-y-0 gap-4 border-neutral-800 bg-neutral-900 p-0 py-6">
        <DialogHeader className="mb-2 px-6">
          <DialogTitle>Pesquisar produtos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-6">
          <div className="group overflow-hidden rounded-lg border border-transparent focus-within:border-2 focus-within:border-neutral-600">
            <div className="relative flex w-full items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 group-focus-within:border-none">
              <Search className="w-5 text-neutral-400" />
              <input
                placeholder="Pesquise por modelo ou marca"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400"
              />
              {isPending ? (
                <LoaderCircle className="w-7 animate-spin text-neutral-400" />
              ) : (
                <button
                  type="button"
                  data-active={inputValue !== ''}
                  onClick={() => setInputValue('')}
                  className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 data-[active=true]:flex"
                >
                  <X className="w-4 text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        </form>
        <ul className="flex flex-col px-6">
          {searchResults && searchResults.length <= 0 && (
            <span className="px-4 text-neutral-400">Nenhum resultado encontrado</span>
          )}
          {searchResults?.map((product) => {
            const firstVariant = product.variants.edges[0].node
            const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)

            return (
              <li
                key={product.id}
                className="group rounded-lg border border-transparent px-2 py-3 hover:border-neutral-700 hover:bg-neutral-800"
              >
                <DialogClose asChild>
                  <Link href={productUrl} className="flex w-full justify-between">
                    <div className="flex gap-3 text-sm">
                      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-black/20 group-hover:bg-black/40">
                        <Image
                          src={firstVariant.image?.url}
                          fill
                          alt={product.title}
                          style={{ objectFit: 'contain' }}
                          className="p-1"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-medium">{product.title}</p>
                        {firstVariant.title !== DEFAULT_OPTION && (
                          <p className="text-xs text-neutral-400">{firstVariant.title}</p>
                        )}
                        <p className="text-sm font-medium">{formatPriceToBrl(firstVariant.price.amount)}</p>
                      </div>
                    </div>
                  </Link>
                </DialogClose>
              </li>
            )
          })}
        </ul>
        {searchResults && searchResults.length >= 4 && (
          <div className="flex w-full justify-end px-6">
            <DialogClose asChild>
              <Link href={`/search?query=${inputValue}`} className="text-sm text-neutral-400 hover:text-white">
                Todos resultados
              </Link>
            </DialogClose>
          </div>
        )}
        {recentSearches && recentSearches.length > 0 && inputValue === '' && (
          <div className="flex flex-col gap-4 px-6">
            <span className="text-sm font-semibold">Recentes</span>
            <ul className="flex flex-col gap-2">
              {recentSearches.map((item, index) => (
                <li
                  key={index}
                  className="group flex w-full items-center justify-between rounded-md bg-neutral-800 px-3 text-neutral-400"
                >
                  <DialogClose asChild>
                    <Link
                      href={`/search?query=${item}`}
                      className="flex w-full items-center gap-2 py-4 text-sm hover:text-blue-600"
                    >
                      <SearchIcon size={14} />
                      {item}
                    </Link>
                  </DialogClose>
                  <button onClick={() => handleClearRecentSearch(item)} className="p-1 hover:text-red-400">
                    <X className="w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { LoaderCircle, Search, SearchIcon, Trash, X } from 'lucide-react'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { ProductType } from '@/lib/shopify/types'
import { formatPriceToBrl, productVariantUrl, removeEdgesAndNodes } from '@/lib/utils'
import { searchProductsAction } from '@/app/actions/search'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
        <button
          aria-label="Pesquisar produto"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 outline-none hover:bg-neutral-900 hover:text-white"
        >
          <SearchIcon className="w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="fixed left-1/2 top-20 z-50 w-full max-w-[650px] -translate-x-1/2 translate-y-0 select-none overflow-hidden border-none p-0 px-4 py-0 sm:top-5">
        <div className="overflow-hidden rounded-lg border border-neutral-800 bg-black">
          <form onSubmit={handleSubmit}>
            <div className="relative flex w-full items-center gap-3 border-b border-neutral-800 bg-black px-4 group-focus-within:border-none">
              <Search className="w-5 text-neutral-400" />
              <input
                placeholder="Pesquise por modelo ou marca"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-neutral-400"
              />
              {isPending ? (
                <div>
                  <LoaderCircle className="h-6 w-6 animate-spin text-neutral-400" />
                </div>
              ) : (
                <button
                  type="button"
                  data-active={inputValue !== ''}
                  onClick={() => setInputValue('')}
                  className="absolute right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 data-[active=true]:flex"
                >
                  <X className="w-4 text-neutral-400" />
                </button>
              )}
            </div>
          </form>
          {searchResults && searchResults.length <= 0 && (
            <span className="m-auto mt-4 block w-full py-4 text-center text-sm text-neutral-400">
              Nenhum resultado encontrado
            </span>
          )}
          {searchResults && (
            <ul className="flex flex-col p-2">
              {searchResults?.map((product) => {
                const firstVariant = product.variants.edges[0].node
                const productUrl = productVariantUrl(firstVariant.selectedOptions, product.handle)

                return (
                  <li
                    key={product.id}
                    className="group rounded-lg px-2 py-2 hover:border-neutral-700 hover:bg-neutral-900"
                  >
                    <DialogClose asChild>
                      <Link href={productUrl} className="flex w-full justify-between">
                        <div className="flex gap-3 text-sm">
                          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 group-hover:bg-black/30">
                            <Image
                              src={firstVariant.image?.url}
                              fill
                              alt={product.title}
                              style={{ objectFit: 'contain' }}
                              className="p-2"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal sm:text-xs">{product.title}</p>
                            <p className="text-sm font-normal text-neutral-300 sm:text-xs">
                              {formatPriceToBrl(firstVariant.price.amount)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </DialogClose>
                  </li>
                )
              })}
            </ul>
          )}
          {searchResults && searchResults.length >= 4 && (
            <DialogFooter className="flex w-full justify-between border-t border-neutral-800 p-3">
              <DialogClose asChild>
                <Link
                  href={`/search?query=${inputValue}`}
                  className="w-max rounded-md bg-neutral-900 px-2 py-1 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300"
                >
                  Todos resultados
                </Link>
              </DialogClose>
            </DialogFooter>
          )}
          {recentSearches && recentSearches.length > 0 && inputValue === '' && (
            <div className="flex flex-col gap-4 p-4">
              <span className="text-sm font-semibold">Recentes</span>
              <ul className="flex flex-col gap-2">
                {recentSearches.map((item, index) => (
                  <li
                    key={index}
                    className="group flex w-full items-center justify-between rounded-md bg-neutral-900 px-3 text-neutral-400 hover:bg-neutral-800"
                  >
                    <DialogClose asChild>
                      <Link href={`/search?query=${item}`} className="flex w-full items-center gap-2 py-3 text-sm">
                        <SearchIcon size={14} />
                        {item}
                      </Link>
                    </DialogClose>
                    <button
                      onClick={() => handleClearRecentSearch(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-700 hover:text-red-400"
                    >
                      <Trash className="w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

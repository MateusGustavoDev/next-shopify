import { Menu, X } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'

const { SITE_NAME } = process.env

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:bg-neutral-900 hover:text-white"
        >
          <Menu className="w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[400px] border-neutral-800 bg-black p-0">
        <SheetHeader className="flex flex-row items-center justify-between border-b border-neutral-800 p-4">
          <SheetTitle className="w-max text-white">
            <Link href="/" className="text-2xl font-black uppercase text-blue-600">
              {SITE_NAME}
            </Link>
          </SheetTitle>
          <SheetClose className="w-max rounded-md border border-neutral-800 p-2 hover:bg-neutral-900">
            <X />
          </SheetClose>
        </SheetHeader>
        <div className="mt-2 p-4">
          <h1 className="text-base font-semibold uppercase">Categorias</h1>
          <ul className="mt-2 flex flex-col">
            <li className="rounded-md py-4 text-sm text-neutral-300">
              <SheetClose asChild>
                <Link href="/collections/smartphones">Smartphones</Link>
              </SheetClose>
            </li>
            <li className="rounded-md py-4 text-sm text-neutral-300">
              <SheetClose asChild>
                <Link href="/collections/watches">Watches</Link>
              </SheetClose>
            </li>
            <li className="rounded-md py-4 text-sm text-neutral-300">
              <SheetClose asChild>
                <Link href="/collections/mais-vendidos">Mais Vendidos</Link>
              </SheetClose>
            </li>
            <li className="rounded-md py-4 text-sm text-neutral-300">
              <SheetClose asChild>
                <Link href="/search">Todos</Link>
              </SheetClose>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}

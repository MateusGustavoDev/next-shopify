import Link from 'next/link'
import { Wrapper } from '@/components/wrapper'
import { User } from 'lucide-react'
import { SearchModal } from '../search/search-bar'
import { CartModal } from '@/components/cart/modal'
import { MobileMenu } from './mobile-menu'

const { SITE_NAME } = process.env

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black">
      <Wrapper>
        <div className="flex h-[70px] w-full items-center justify-between">
          <div className="hidden items-center gap-4 lg:flex">
            <MobileMenu />
            <SearchModal />
          </div>
          <Link href="/" className="text-2xl font-black uppercase text-blue-600">
            {SITE_NAME}
          </Link>
          <ul className="flex w-full justify-center gap-2 text-sm text-neutral-400 lg:hidden">
            <li>
              <Link
                href="/collections/smartphones"
                className="rounded-md p-2 px-4 hover:bg-neutral-900 hover:text-white"
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                href="/collections/mais-vendidos"
                className="rounded-md p-2 px-4 hover:bg-neutral-900 hover:text-white"
              >
                Mais Vendidos
              </Link>
            </li>
            <li>
              <Link href="/collections/novidades" className="rounded-md p-2 px-4 hover:bg-neutral-900 hover:text-white">
                Novidades
              </Link>
            </li>
            <li>
              <Link href="/search" className="rounded-md p-2 px-4 hover:bg-neutral-900 hover:text-white">
                Todos
              </Link>
            </li>
          </ul>
          <div className="flex shrink-0 items-center gap-6 lg:gap-4">
            <div className="flex items-center lg:hidden">
              <SearchModal />
            </div>
            <Link
              aria-label="Conta"
              href="/account/orders"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:bg-neutral-900 hover:text-white"
            >
              <User className="w-5" />
            </Link>
            <CartModal />
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

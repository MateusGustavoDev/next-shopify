import Link from 'next/link'
import { Wrapper } from '@/components/wrapper'
import { CircleUserRound } from 'lucide-react'
import { SearchModal } from '../search/search-bar'
import { CartModal } from '@/components/cart/modal'
import { MobileMenu } from './mobile-menu'

const { SITE_NAME } = process.env

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black">
      <Wrapper>
        <div className="flex h-[70px] w-full items-center justify-between">
          <div className="hidden items-center gap-4 tablet:flex">
            <MobileMenu />
            <SearchModal />
          </div>
          <Link href="/" className="text-2xl font-semibold text-blue-600">
            {SITE_NAME}
          </Link>
          <ul className="flex w-full justify-center gap-8 text-sm text-neutral-400 tablet:hidden">
            <li>
              <Link href="/collections/smartphones" className="hover:text-white">
                Smartphones
              </Link>
            </li>
            <li>
              <Link href="/collections/watches" className="hover:text-white">
                Watches
              </Link>
            </li>
            <li>
              <Link href="/collections/novidades" className="hover:text-white">
                Novidades
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-white">
                Todos
              </Link>
            </li>
          </ul>
          <div className="flex shrink-0 items-center gap-7 tablet:gap-4">
            <div className="flex items-center tablet:hidden">
              <SearchModal />
            </div>
            <Link aria-label="Conta" href="/account/orders" className="hover:text-white">
              <CircleUserRound className="w-7 text-neutral-400 hover:text-white" />
            </Link>
            <CartModal />
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

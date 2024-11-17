import '@/app/globals.css'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { ReactNode } from 'react'

interface PagesLayoutProps {
  children: ReactNode
}

export default function PagesLayout({ children }: PagesLayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  )
}

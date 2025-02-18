import '@/app/globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Generated by create next app',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={geistSans.variable}>{children}</body>
    </html>
  )
}

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  className?: string
}

export function Wrapper({ children, className }: WrapperProps) {
  return <div className={cn('m-auto w-full max-w-screen-wrapper px-5 lg:px-4', className)}>{children}</div>
}

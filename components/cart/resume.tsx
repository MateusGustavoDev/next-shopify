import { formatPriceToBrl } from '@/lib/utils'

interface CartResumeProps {
  subtotal: string
  total: string
  fee: string
  checkoutUrl: string
}

export function CartResume({ subtotal, total, fee, checkoutUrl }: CartResumeProps) {
  return (
    <section className="mb-8">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-neutral-400">Subtotal</span>
        <span>{formatPriceToBrl(subtotal)}</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-neutral-800" />
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-neutral-400">Taxas</span>
        <span className="uppercase">{formatPriceToBrl(fee)}</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-neutral-800" />
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-neutral-400">Entrega</span>
        <span className="uppercase">Gratis</span>
      </div>
      <div className="my-3 h-[1px] w-full bg-neutral-800" />
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-neutral-400">Total</span>
        <span>{formatPriceToBrl(total)}</span>
      </div>
      <a href={checkoutUrl}>
        <button className="mt-6 w-full rounded-full bg-blue-600 py-2 text-white hover:bg-blue-700">
          Finalizar compra
        </button>
      </a>
    </section>
  )
}

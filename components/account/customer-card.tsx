import { deleteSession } from '@/app/actions/auth/session'
import { getCustomerInfoAction } from '@/app/actions/customer'
import Link from 'next/link'

export async function CustomerCard() {
  const data = await getCustomerInfoAction()

  if (!data) return null

  return (
    <div className="flex h-[700px] w-full max-w-[360px] flex-col justify-between border border-black bg-white p-5">
      <div>
        <div className="mb-10 flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white">
            {data.firstName && data.lastName ? data.firstName[0] + data.lastName[0] : ''}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{`${data.firstName} ${data.lastName}`}</span>
            <span className="text-sm text-neutral-500">{data.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/account/orders">Pedidos</Link>
          <Link href="/account/address">Endereços</Link>
        </div>
      </div>
      <form action={deleteSession}>
        <button type="submit" className="w-full bg-black py-2 text-white">
          Sair da conta
        </button>
      </form>
    </div>
  )
}

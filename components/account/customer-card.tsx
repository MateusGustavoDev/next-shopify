import { deleteSession } from '@/app/actions/auth/session'
import { getCustomerInfoAction } from '@/app/actions/customer'
import Link from 'next/link'

export async function CustomerCard() {
  const data = await getCustomerInfoAction()

  if (!data) return null

  return (
    <div className="flex h-[700px] w-full max-w-[360px] flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-semibold text-black">
            {data.firstName && data.lastName ? data.firstName[0] + data.lastName[0] : ''}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{`${data.firstName} ${data.lastName}`}</span>
            <span className="text-sm text-neutral-400">{data.email}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <Link href="/account/orders" className="rounded-md p-2 py-3 hover:bg-neutral-800">
            Meus pedidos
          </Link>
          <Link href="" className="rounded-md p-2 py-3 hover:bg-neutral-800">
            Meus endereços
          </Link>
        </div>
      </div>
      <form action={deleteSession}>
        <button type="submit" className="w-full rounded-md bg-neutral-800 py-2 text-sm text-white hover:bg-neutral-700">
          Sair da conta
        </button>
      </form>
    </div>
  )
}

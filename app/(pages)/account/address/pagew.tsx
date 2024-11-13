import { AddressCard } from '@/components/account/address-card'
import { Metadata } from 'next'
const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: `Endereços | ${SITE_NAME} `,
}

export default function AddressPage() {
  return (
    <div className="relative h-[600px] w-full border border-black p-5">
      <span className="text-xl uppercase">Seus Endereços</span>
      <div className="mt-10 flex flex-col gap-2">
        <button className="w-max">Novo Endereços</button>
        <div className="flex flex-col gap-4">
          <AddressCard />
          <AddressCard />
        </div>
      </div>
    </div>
  )
}

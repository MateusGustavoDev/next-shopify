import { ProfileCard } from '@/app/(pages)/profile/components/profile-card'
import { AddressCard } from '@/app/(pages)/profile/components/address-card'
import { Wrapper } from '@/components/wrapper'
import { Metadata } from 'next'
const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: `${SITE_NAME} | Endereços`,
  description: 'Generated by create next app',
}

export default function Address() {
  return (
    <Wrapper>
      <div className="mt-10 flex w-full gap-4">
        <ProfileCard />
        <div className="relative h-[600px] w-full border border-black p-5">
          <span className="text-xl uppercase">Seus Endereços</span>
          <div className="mt-10 flex flex-col gap-2">
            <button className="w-max underline">Novo Endereços</button>
            <div className="flex flex-col gap-4">
              <AddressCard />
              <AddressCard />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

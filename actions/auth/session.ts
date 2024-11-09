'use server'
import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { getCustomerInfoQuery } from '@/lib/shopify/graphql/queries/customer'
import { CustomerMetafieldsQuery } from '@/lib/shopify/graphql/generated'

export async function getCustomerAccessToken() {
  const cookieStore = await cookies()
  const customerAccessToken = cookieStore.get('customerAuth')?.value

  return customerAccessToken
}

export async function createSession(customerAccessToken: string, expiresAt: Date) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'customerAuth',
    value: customerAccessToken,
    httpOnly: true,
    secure: true,
    path: '/',
  })

  redirect('/')
}

export async function deleteSession() {
  const cookieStore = await cookies()

  cookieStore.delete('customerAuth')

  redirect('/')
}

export async function verifySession() {
  const customerAccessToken = await getCustomerAccessToken()

  if (!customerAccessToken) redirect('/login')

  const { data } = await shopifyFetch<CustomerMetafieldsQuery>({
    query: getCustomerInfoQuery,
    variables: {
      customerAccessToken: customerAccessToken,
    },
  })

  if (data?.customer) return { isAuth: true, userId: data.customer.id }

  redirect('/login')
}

export async function verifySessionMiddleware(customerAccessToken: string | undefined) {
  if (!customerAccessToken) return { isAuth: false }

  const { data } = await shopifyFetch<CustomerMetafieldsQuery>({
    query: getCustomerInfoQuery,
    variables: {
      customerAccessToken: customerAccessToken,
    },
  })

  if (data?.customer) return { isAuth: true }

  return { isAuth: false }
}

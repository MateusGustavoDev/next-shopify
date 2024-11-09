'use server'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { getCustomerInfoQuery, getCustomerOrdersQuery } from '@/lib/shopify/graphql/queries/customer'
import { CustomerMetafieldsQuery, GetCustomerOrdersQuery } from '@/lib/shopify/graphql/generated'
import { getCustomerAccessToken } from './auth/session'

type GetCustomerOrdersAction = {
  customerAccessToken: string
  page: number | undefined
}

export async function getCustomerOrdersAction({ customerAccessToken, page }: GetCustomerOrdersAction) {
  const { data, errors } = await shopifyFetch<GetCustomerOrdersQuery>({
    query: getCustomerOrdersQuery,
    variables: {
      customerAccessToken: customerAccessToken,
      numOfOrders: page ? page * 10 : 10,
    },
  })

  if (!data?.customer || errors) return undefined

  const formattedOrder = data.customer.orders.edges.map((item) => ({
    orderNumber: item.node.orderNumber,
    totalPrice: item.node.totalPrice,
    subtotalPrice: item.node.subtotalPrice,
    totalShippingPrice: item.node.totalShippingPrice,
    totalTax: item.node.totalTax,
    processedAt: item.node.processedAt,
    statusUrl: item.node.statusUrl,
    fulfillmentStatus: item.node.fulfillmentStatus,
    lineItems: item.node.lineItems.edges.map((item) => ({
      title: item.node.title,
      quantity: item.node.quantity,
      variant: {
        id: item.node.variant?.id,
        title: item.node.variant?.title,
        image: item.node.variant?.image,
        price: item.node.variant?.price,
        compareAtPrice: item.node.variant?.compareAtPrice,
      },
    })),
  }))

  return {
    orders: formattedOrder,
    pageInfo: data.customer?.orders.pageInfo,
  }
}

export async function getCustomerInfoAction() {
  const customerAccessToken = await getCustomerAccessToken()

  if (!customerAccessToken) return undefined

  const { data, errors } = await shopifyFetch<CustomerMetafieldsQuery>({
    query: getCustomerInfoQuery,
    variables: {
      customerAccessToken: customerAccessToken,
    },
  })

  if (!data?.customer || errors) return undefined

  return data.customer
}

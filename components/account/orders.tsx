import { getCustomerOrdersAction } from '@/app/actions/customer'
import { formateDateToBr, formatPriceToBrl } from '@/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DEFAULT_OPTION, ORDER_STATUS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { getCustomerAccessToken } from '@/app/actions/auth/session'

interface CustomerOrdersProps {
  page: number | undefined
}

export async function CustomerOrders({ page }: CustomerOrdersProps) {
  const customerAccessToken = await getCustomerAccessToken()

  if (!customerAccessToken) notFound()

  const data = await getCustomerOrdersAction({
    customerAccessToken: customerAccessToken,
    page: page,
  })

  if (!data) notFound()

  return (
    <div className="w-full">
      {/* <pre className="bg-neutral-200">{JSON.stringify(data.orders, null, 2)}</pre> */}
      {data.orders.length > 0 ? (
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex flex-col gap-4 overflow-y-auto">
            {data.orders.map((order) => (
              <Accordion key={order.orderNumber} type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 hover:no-underline data-[state=open]:rounded-bl-none data-[state=open]:rounded-br-none data-[state=open]:border-b-transparent">
                    <table className="w-full gap-2">
                      <thead>
                        <tr className="text-center text-sm">
                          <th className="pb-1 text-sm font-medium text-neutral-400">Numero</th>
                          <th className="pb-1 text-sm font-medium text-neutral-400">Data</th>
                          <th className="pb-1 text-sm font-medium text-neutral-400">Status</th>
                          <th className="pb-1 text-sm font-medium text-neutral-400">Items</th>
                          <th className="pb-1 text-sm font-medium text-neutral-400">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center text-sm">
                          <td className="font-normal text-white">#{order.orderNumber}</td>
                          <td className="font-normal text-white">{formateDateToBr(order.processedAt)}</td>
                          <td className="font-normal text-white">{order.fulfillmentStatus}</td>
                          <td className="font-normal text-white">{order.lineItems.length}</td>
                          <td className="font-normal text-white">{formatPriceToBrl(order.totalPrice.amount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-b-lg border border-neutral-800 border-t-transparent bg-neutral-900 px-5 py-2">
                      <div className="flex flex-col justify-between gap-4 border-t border-neutral-700 py-4">
                        <a
                          href={order.statusUrl}
                          className="flex w-max items-center gap-1 rounded-md bg-neutral-800 px-2 text-xs text-blue-400 hover:text-blue-500"
                        >
                          Mais detalhes e rastreio
                          <ArrowUp className="w-4 rotate-45" />
                        </a>
                        {order.lineItems.map((item) => (
                          <div key={item.variant.id} className="flex justify-between">
                            <div className="flex gap-3">
                              <div className="flex h-20 w-20 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800">
                                <Image src={item.variant.image?.url} alt="" width={50} height={50} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm">{item.title}</p>
                                {item.variant.title !== DEFAULT_OPTION && (
                                  <p className="text-neutral-300">{item.variant.title}</p>
                                )}
                                <p className="text-neutral-400">Quantidade: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-sm">{formatPriceToBrl(item.variant.price?.amount)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col pb-3">
                        <div className="flex w-full items-center justify-between border-b border-neutral-700 py-3">
                          <p className="text-neutral-400">Subtotal</p>
                          <p>{formatPriceToBrl(order.subtotalPrice?.amount)}</p>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-800" />
                        <div className="flex w-full items-center justify-between border-b border-neutral-700 py-3">
                          <p className="text-neutral-400">Frete</p>
                          <p>{formatPriceToBrl(order.totalShippingPrice.amount)}</p>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-800" />
                        <div className="flex w-full items-center justify-between border-b border-neutral-700 py-3">
                          <p className="text-neutral-400">Taxas</p>
                          <p>{formatPriceToBrl(order.totalTax?.amount)}</p>
                        </div>
                        <div className="flex w-full items-center justify-between border-b border-neutral-700 py-3">
                          <p className="font-semibold text-white">Total</p>
                          <p className="font-semibold">{formatPriceToBrl(order.totalPrice.amount)}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          {data.pageInfo.hasNextPage && (
            <Link
              href={Number(page) ? `/account/orders?page=${Number(page) + 1}` : `/account/orders?page=2`}
              className="m-auto mt-10 w-max bg-black p-2 text-white"
            >
              Carregar mais
            </Link>
          )}
        </div>
      ) : (
        <span className="m-auto text-xl">Você não tem nenhum pedido.</span>
      )}
    </div>
  )
}

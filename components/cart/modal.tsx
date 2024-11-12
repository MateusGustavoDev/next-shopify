import { ShoppingBag, ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CartResume } from './resume'
import { CartItem } from './item'
import { getCart } from '@/lib/shopify/fetch/cart'
import { CartType } from '@/lib/shopify/types'
import { getCartId } from '@/app/actions/cart'

export async function CartModal() {
  const cartId = await getCartId()

  let cart: CartType | undefined

  if (cartId) {
    cart = await getCart(cartId)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Carrinho" className="relative">
          {cart && cart.totalQuantity > 0 && (
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
              {cart.totalQuantity}
            </div>
          )}
          <ShoppingBag className="w-7 text-neutral-400 hover:text-white" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[430px] border-neutral-800 bg-black py-10">
        <SheetHeader className="flex w-max flex-row items-center justify-center gap-2 rounded-full border-2 border-blue-600 px-4 py-2">
          <ShoppingCart className="w-5" />
          <SheetTitle className="text-sm font-semibold text-white">Carrinho de compras</SheetTitle>
        </SheetHeader>
        {cart && cart.totalQuantity > 0 ? (
          <div className="flex h-full flex-col justify-between">
            <ul className="flex flex-col overflow-auto pt-6">
              {cart.lines.map((item) => {
                const selectedVariant = item.merchandise.product.variants.edges.find(
                  (variant) => variant.node.id === item.merchandise.id,
                )

                const quantityAvailable = selectedVariant?.node.quantityAvailable

                if (item.quantity <= 0) return

                return (
                  <li key={item.id}>
                    <CartItem
                      id={item.id}
                      cartId={cart.id}
                      merchandiseId={item.merchandise.id}
                      title={item.merchandise.product.title}
                      variantTitle={item.merchandise.title}
                      price={selectedVariant?.node.price.amount}
                      image={selectedVariant?.node.image?.url}
                      quantity={item.quantity}
                      quantityAvailable={quantityAvailable ? quantityAvailable : 0}
                    />
                  </li>
                )
              })}
            </ul>
            <CartResume
              subtotal={cart.cost.subtotalAmount.amount}
              total={cart.cost.totalAmount.amount}
              fee={cart.cost.totalTaxAmount?.amount}
              checkoutUrl={cart.checkoutUrl}
            />
          </div>
        ) : (
          <span className="m-auto mt-20 block w-max text-xl font-bold">O carrinho está vazio :{'('}</span>
        )}
      </SheetContent>
    </Sheet>
  )
}

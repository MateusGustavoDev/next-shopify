'use client'
import { updateItemQuantityAction } from '@/app/actions/cart'
import { Loader, LoaderCircle, MinusIcon, PlusIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface EditItemQuantityProps {
  id: string
  merchandiseId: string
  quantity: number
  quantityAvailable: number
}

export function EditItemQuantity(props: EditItemQuantityProps) {
  return (
    <SelectItemQuantity
      id={props.id}
      merchandiseId={props.merchandiseId}
      quantity={props.quantity}
      quantityAvailable={props.quantityAvailable}
    />
  )
}

export function SelectItemQuantity(props: EditItemQuantityProps) {
  async function handleUpdateItemQuantity(type: 'plus' | 'minus') {
    const payload = {
      lineId: props.id,
      variantId: props.merchandiseId,
      quantity: type === 'plus' ? props.quantity + 1 : props.quantity - 1,
    }

    const { errors } = await updateItemQuantityAction(payload)
    if (errors) alert(errors.message)
  }

  const handleIncrementQuantity = handleUpdateItemQuantity.bind(null, 'plus')
  const handleDecrementQuantity = handleUpdateItemQuantity.bind(null, 'minus')

  return (
    <div className="mt-2 flex h-9 w-[88px] items-center justify-center gap-3 rounded-md border border-neutral-800 bg-neutral-900">
      <form action={handleDecrementQuantity} className="flex items-center">
        <Button type="minus" />
      </form>
      <span className="text-sm">{props.quantity}</span>
      <form action={handleIncrementQuantity} className="flex items-center">
        <Button type="plus" disabled={props.quantity === props.quantityAvailable} />
      </form>
    </div>
  )
}

interface ButtonProps {
  type: 'minus' | 'plus'
  disabled?: boolean
}

export function Button({ type, disabled }: ButtonProps) {
  const { pending } = useFormStatus()

  if (pending)
    return (
      <div className="flex w-6 items-center justify-center">
        <Loader className="w-4 animate-spin text-neutral-400" />
      </div>
    )

  return (
    <button
      aria-disabled={pending || disabled}
      className="flex h-6 w-6 items-center justify-center rounded-sm text-neutral-400 hover:bg-neutral-800 aria-disabled:pointer-events-none aria-disabled:text-neutral-400"
    >
      {type === 'minus' ? <MinusIcon className="w-4" /> : <PlusIcon className="w-4" />}
    </button>
  )
}

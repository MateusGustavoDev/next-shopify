'use client'
import { ProductOptionType, ProductVariantType } from '@/lib/shopify/types'
import { cn, createUrl } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface VariantSelectorProps {
  options: ProductOptionType[]
  variants: ProductVariantType[]
}

export type Combination = {
  id: string
  availableForSale: boolean
  [key: string]: string | boolean
}

export function VariantSelector({ options, variants }: VariantSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const hasNoOptionsOrJustOneOption = !options?.length || (options.length === 1 && options[0].optionValues.length === 1)

  if (hasNoOptionsOrJustOneOption) return null

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {},
    ),
  }))

  const hasColorOptions = options.find((option) => option.name === 'Cor')

  const formattedColorOptions = hasColorOptions?.optionValues.map((color) => ({
    name: color.name,
    color: color.swatch?.color as string,
  }))

  const selectedColor = searchParams.get('cor')

  return (
    <div className="mt-10 flex flex-col gap-4">
      {formattedColorOptions && <ColorSelector colors={formattedColorOptions} selectedColor={selectedColor} />}
      {options.map((option) => {
        if (option.name === 'Cor') return null

        return (
          <div key={option.id}>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-normal mobile:text-xs">{option.name}</span>
              <ul className="flex flex-wrap gap-3">
                {option.optionValues.map((value) => {
                  const optionNameLowerCase = option.name.toLocaleLowerCase()
                  const optionSearchParams = new URLSearchParams(searchParams.toString())
                  optionSearchParams.set(optionNameLowerCase, value.name)
                  const optionUrl = createUrl(pathname, optionSearchParams)

                  const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
                    options.find(
                      (option) =>
                        option.name.toLowerCase() === key &&
                        option.optionValues.some((optValue) => optValue.name === value),
                    ),
                  )

                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(([key, value]) => combination[key] === value && combination.availableForSale),
                  )

                  const isActive = searchParams.get(optionNameLowerCase) === value.name

                  return (
                    <li key={value.id}>
                      <div
                        className={cn('rounded-full border border-transparent', {
                          'border-neutral-600': isActive && !isAvailableForSale,
                        })}
                      >
                        <button
                          onClick={() => router.replace(optionUrl, { scroll: false })}
                          aria-disabled={!isAvailableForSale}
                          data-active={isActive}
                          className={cn(
                            'group relative block w-max overflow-hidden rounded-full border border-transparent px-3 py-2 text-xs aria-disabled:pointer-events-none',
                            {
                              'cursor-default border-transparent bg-blue-600 text-white': isActive,
                              'border-neutral-700 hover:bg-neutral-800': !isActive && isAvailableForSale,
                              'border-neutral-700 bg-neutral-800 text-neutral-500': !isAvailableForSale,
                              'border-neutral-600': isActive && !isAvailableForSale,
                            },
                          )}
                        >
                          <div className="absolute left-1/2 top-1/2 hidden h-[1px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-neutral-700 group-aria-disabled:block" />
                          {value.name}
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

type Color = {
  name: string
  color: string
}

type ColorSelectorProps = {
  colors: Color[]
  selectedColor: string | null
}

function ColorSelector({ colors, selectedColor }: ColorSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-normal mobile:text-xs">Cor {selectedColor ? `- ${selectedColor}` : null}</p>
      <div className="flex gap-2">
        {colors.map((color) => {
          const colorSearchParams = new URLSearchParams(searchParams.toString())
          colorSearchParams.set('cor', color.name)
          const urlWithColorOption = createUrl(pathname, colorSearchParams)

          return (
            <button
              key={color.name}
              data-active={selectedColor === color.name}
              onClick={() => router.replace(urlWithColorOption)}
              className="w-max rounded-full border border-transparent p-1 data-[active=true]:pointer-events-none data-[active=true]:border-blue-600"
            >
              <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color.color }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

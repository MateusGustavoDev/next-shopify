import { LoaderCircle } from 'lucide-react'
import { ElementType, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'w-max gap-2 aria-disabled:pointer-events-none font-medium flex justify-center items-center',
  variants: {
    color: {
      primary:
        'bg-blue-600 hover:bg-blue-700 text-white data-[pending=true]:text-neutral-300 data-[pending=true]:bg-neutral-800',
      secondary:
        'bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-neutral-300 data-[pending=true]:text-neutral-300 data-[pending=true]:bg-neutral-800',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },
    disabled: {
      true: 'pointer-events-none bg-neutral-200 text-neutral-700 border border-neutral-300',
    },
    svgOnly: {
      true: 'px-0',
    },
    full: {
      true: 'w-full',
    },
    size: {
      sm: 'text-sm h-8 px-3',
      md: 'text-sm h-10 px-4',
      lg: 'text-base h-12 px-5 ',
    },
  },
  compoundVariants: [
    {
      svgOnly: true,
      size: 'sm',
      className: 'h-6 w-6',
    },
    {
      svgOnly: true,
      size: 'md',
      className: 'w-8 h-8',
    },
    {
      svgOnly: true,
      size: 'lg',
      className: 'w-10 h-10',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
    shape: 'square',
    full: false,
    svgOnly: false,
    disabled: false,
  },
})

type ActionButtonProps = VariantProps<typeof button> & {
  children?: ReactNode
  icon?: ElementType
}

export function ActionButton({ children, size, color, icon, svgOnly, shape, disabled, full }: ActionButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending || disabled}
      data-pending={pending}
      type="submit"
      className={button({ size, color, shape, disabled, svgOnly, full })}
    >
      {pending ? (
        svgOnly ? (
          <div>
            <Loader color={color} />
          </div>
        ) : (
          <>
            <Loader size={size} color={color} />
            {children}
          </>
        )
      ) : svgOnly && icon ? (
        <div>
          <Icon icon={icon} color={color} />
        </div>
      ) : icon ? (
        <div className="flex items-center gap-2">
          <Icon icon={icon} color={color} />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

const loader = tv({
  base: 'animate-spin',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-4 w-4',
      lg: 'h-7 w-7 ',
    },
    color: {
      primary: 'text-white',
      secondary: 'text-neutral-400',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'secondary',
  },
})

type LoaderProps = VariantProps<typeof loader>

function Loader({ size, color }: LoaderProps) {
  return <LoaderCircle className={loader({ size, color })} />
}

const icon = tv({
  base: 'text-white',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-7 w-7 ',
    },
    color: {
      primary: 'text-white',
      secondary: 'text-neutral-400',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

type IconProps = VariantProps<typeof icon> & {
  icon: ElementType
  color: 'primary' | 'secondary' | undefined
}

export function Icon({ icon: Icon, size, color }: IconProps) {
  return <Icon className={icon({ size, color })} />
}

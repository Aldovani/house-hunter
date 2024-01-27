import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'font-medium text-slate-700 py-3 w-full rounded-xl leading-[100%]',
  variants: {
    variant: {
      ghost:
        'relative  after:absolute after:w-full after:inset-0 hover:after:scale-100 after:scale-0 after:transition-all  after:bg-slate-50/25 px-6  after:rounded-lg after:-z-1',
      primary:
        'border border-indigo-400 shadow-button-primary  bg-indigo-700   text-slate-50  hover:opacity-95 transition-all',
      secondary:
        'shadow-button-secondary border border-white bg-slate-100  hover:brightness-90 transition-all',
      outline:
        ' border border-l-slate-200 text-indigo-700 hover:brightness-[.99] bg-slate-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants, ComponentProps<'button'> {
  children: React.ReactNode
}

export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={button({ className, variant })}>
      {children}
    </button>
  )
}

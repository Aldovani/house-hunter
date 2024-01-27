import NextLink, { LinkProps } from 'next/link'
import { tv, type VariantProps } from 'tailwind-variants'

const link = tv({
  base: '  rounded-xl text-base text-center whitespace-nowrap  block font-medium text-slate-700 py-3 w-full leading-[100%]',
  variants: {
    variant: {
      ghost:
        'relative  after:absolute after:w-full after:inset-0 hover:after:scale-100 after:scale-0 after:transition-all  after:bg-slate-50/25 px-6  after:rounded-lg after:-z-1',
      primary:
        'border border-indigo-400 shadow-button-primary  bg-indigo-700   text-slate-50  hover:opacity-95 transition-all',
      secondary:
        'shadow-button-secondary border border-white bg-slate-100  hover:brightness-90 transition-all',
      outline: '',
      link: 'text-indigo-700 w-fit',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type linkVariants = VariantProps<typeof link>

interface ButtonProps extends linkVariants, LinkProps {
  children: React.ReactNode
  className?: string
}

export function Link({
  children,
  variant,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <NextLink
      {...props}
      className={link({
        className,
        variant,
      })}
    >
      {children}
    </NextLink>
  )
}

import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const label = tv({
  base: 'text-slate-600 block  group/error ',
})

type LabelVariants = VariantProps<typeof label>

interface LabelProps extends LabelVariants, ComponentProps<'label'> {
  children: React.ReactNode
  name: string
  isError?: boolean
}

export function Label({
  id,
  name,
  children,
  className,
  isError = false,
}: LabelProps) {
  return (
    <label
      htmlFor={id}
      data-error={isError}
      className={label({
        className,
      })}
    >
      <span className="mb-1 block">{name}</span>
      {children}
    </label>
  )
}

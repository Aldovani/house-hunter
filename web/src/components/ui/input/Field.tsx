import { ComponentProps, ReactNode, Ref, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const field = tv({
  base: "border border-slate-300  bg-slate-100 w-full py-3 pl-5 rounded-lg text-slate-500  outline-indigo-700/40 outline-offset-4  group-data-[error='true']/error:outline-rose-700 group-data-[error='true']/error:focus:text-rose-700  group-data-[error='true']/error:border-rose-200 ",
})

type FieldProps = ComponentProps<'input'> & {
  children?: ReactNode
}

export const Field = forwardRef(function (
  { className, ...props }: FieldProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return <input ref={ref} className={field({ className })} {...props} />
})

Field.displayName = 'InputField'

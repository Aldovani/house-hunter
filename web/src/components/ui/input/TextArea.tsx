import { ComponentProps, ReactNode, Ref, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const textArea = tv({
  base: "min-h-32 border border-slate-300 bg-slate-100 w-full py-3 pl-5 rounded-lg text-slate-500  outline-indigo-700/40 outline-offset-4  group-data-[error='true']/error:outline-rose-700 group-data-[error='true']/error:focus:text-rose-700  group-data-[error='true']/error:border-rose-200 ",
})

type TextAreaProps = ComponentProps<'textarea'> & {
  children?: ReactNode
}

export const TextArea = forwardRef(function (
  { className, ...props }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement> | null,
) {
  return <textarea ref={ref} className={textArea({ className })} {...props} />
})

TextArea.displayName = 'InputTextAreaField'

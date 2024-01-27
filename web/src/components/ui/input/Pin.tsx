import { ComponentProps, Ref, forwardRef } from 'react'

type PinProps = ComponentProps<'input'>

export const Pin = forwardRef(function (
  { ...props }: PinProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return (
    <input
      ref={ref}
      className="outline-indigo-700/40 outline-offset-4  flex items-center justify-center text-center size-16 p-5 text-xl text-slate-500 font-medium border border-slate-300 rounded-xl"
      {...props}
    />
  )
})

Pin.displayName = 'InputPin'

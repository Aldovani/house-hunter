import { ComponentProps } from 'react'
import { useSelect } from './selectContext'

type SelectItemProps = {
  children: React.ReactNode
} & ComponentProps<'input'>

export function SelectItem({ children, id = '', ...props }: SelectItemProps) {
  const { multiple, name, onChange, value } = useSelect()
  return (
    <div>
      <input
        className="peer opacity-0 visible none hidden"
        id={`${id}-id`}
        type={multiple ? 'checkbox' : 'radio'}
        name={name}
        value={id}
        onChange={onChange}
        checked={value.includes(id)}
        {...props}
      />
      <label
        htmlFor={`${id}-id`}
        className="transition-all cursor-pointer rounded-lg block peer-checked:text-indigo-700 peer-checked:bg-indigo-50 peer-checked:border-indigo-700     text-slate-500 border border-slate-200 p-5 "
      >
        {children}
      </label>
    </div>
  )
}

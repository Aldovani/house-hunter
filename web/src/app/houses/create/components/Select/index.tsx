import { InputChange } from '@/@types/events'
import { SelectContextProvider } from './selectContext'

type SelectProps = {
  children: React.ReactNode
  multiple?: boolean
  value: string | string[]
  name?: string
  onChange: (e: InputChange) => void
}

export function Select({
  name = '',
  multiple = false,
  children,
  onChange,
  value,
}: SelectProps) {
  return (
    <SelectContextProvider
      handleChange={onChange}
      name={name}
      value={value}
      multiple={multiple}
    >
      <div className="grid grid-cols-3 gap-5 ">{children}</div>
    </SelectContextProvider>
  )
}

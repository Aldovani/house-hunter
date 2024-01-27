import { InputChange } from '@/@types/events'
import { createContext, useContext } from 'react'

type SelectContextProviderProps = {
  children: React.ReactNode
  multiple: boolean
  name: string
  value: string | string[]
  handleChange: (e: InputChange) => void
}

type SelectContextProps = {
  multiple: boolean
  name?: string
  value: string | string[]

  onChange: (e: InputChange) => void
}

const SelectContext = createContext({} as SelectContextProps)

export function SelectContextProvider({
  children,
  multiple,
  name = '',
  handleChange,
  value,
}: SelectContextProviderProps) {
  return (
    <SelectContext.Provider
      value={{
        value,
        multiple,
        name,
        onChange: handleChange,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

export function useSelect() {
  const data = useContext(SelectContext)

  return { ...data }
}

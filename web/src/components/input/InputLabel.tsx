import { ReactNode } from 'react'
import styles from './styles.module.scss'
type InputLabelProps = {
  id: string
  name: string
  children: ReactNode
  isError: boolean
}

export function InputLabel({ id, name, children, isError }: InputLabelProps) {
  return (
    <label
      htmlFor={id}
      className={`${styles.label} ${isError ? styles.error : ''}`}
    >
      <span>{name}</span>
      {children}
    </label>
  )
}

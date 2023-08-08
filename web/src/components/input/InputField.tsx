import { InputHTMLAttributes, Ref, forwardRef } from 'react'
import styles from './styles.module.scss'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>

export const InputField = forwardRef(function (
  { ...props }: InputFieldProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return <input ref={ref} className={styles.field} {...props} />
})

InputField.displayName = 'InputField'

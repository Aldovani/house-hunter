import { InputHTMLAttributes, ReactNode, Ref, forwardRef } from 'react'
import styles from './styles.module.scss'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: ReactNode
}

export const InputField = forwardRef(function (
  { children, ...props }: InputFieldProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return (
    <div className={styles.containerIcons}>
      <input ref={ref} className={styles.field} {...props} />
      {children}
    </div>
  )
})

InputField.displayName = 'InputField'

import { InputHTMLAttributes, Ref, forwardRef } from 'react'
import styles from './styles.module.scss'

type InputTextAreaProps = InputHTMLAttributes<HTMLTextAreaElement>

export const InputTextAreaField = forwardRef(function (
  { ...props }: InputTextAreaProps,
  ref: Ref<HTMLTextAreaElement> | null,
) {
  return <textarea ref={ref} className={styles.textareaField} {...props} />
})

InputTextAreaField.displayName = 'InputTextAreaField'

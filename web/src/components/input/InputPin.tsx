import { InputHTMLAttributes, Ref, forwardRef } from 'react'
import styles from './styles.module.scss'

type InputPinProps = InputHTMLAttributes<HTMLInputElement>

export const InputPin = forwardRef(function (
  { ...props }: InputPinProps,
  ref: Ref<HTMLInputElement> | null,
) {
  return <input ref={ref} className={styles.pin} {...props} />
})

InputPin.displayName = 'InputPin'

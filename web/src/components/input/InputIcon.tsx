import { ElementType, HtmlHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type InputIconProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  handleClick: () => void
  icon: ElementType
}

export function InputIcon({ handleClick, icon: Icon }: InputIconProps) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${styles.icon} ${styles.right}`}
    >
      <Icon size={20} color="#64748B" />
    </button>
  )
}

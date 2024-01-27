import { ElementType, HtmlHTMLAttributes } from 'react'

import styles from './styles.module.scss'

type IconProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  handleClick: () => void
  icon: ElementType
}

export function Icon({ handleClick, icon: Icon }: IconProps) {
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

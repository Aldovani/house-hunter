import { ReactNode } from 'react'
import styles from './styles.module.scss'

type InputContainerIconsProps = {
  children: ReactNode
}

export function InputContainerIcons({ children }: InputContainerIconsProps) {
  return <div className={styles.containerIcons}>{children}</div>
}

import styles from './styles.module.scss'

type InputErrorProps = {
  message: string | undefined
}

export function InputError({ message }: InputErrorProps) {
  return <p className={styles.messageError}>{message}</p>
}

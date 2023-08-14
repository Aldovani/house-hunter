import styles from './styles.module.scss'
import { Input } from '@/components/input'
export function Contact() {
  return (
    <>
      <h2>Agora adicione uma forma de entrar em contato com você </h2>
      <form className={`${styles.form} ${styles.contacts}`}>
        <Input.Label name="Celular" id="cellphone" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Telefone Fixo" id="phone" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Facebook" id="facebook" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Email" id="email" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>
      </form>
    </>
  )
}

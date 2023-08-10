import styles from './styles.module.scss'
import { Input } from '@/components/input'
export function Location() {
  return (
    <>
      <h2>Agora confirme as informações referente a residência</h2>
      <form className={`${styles.form} ${styles.location}`}>
        <Input.Label name="Estado" id="state" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Cidade" id="city" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Endereço" id="address" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Numero" id="addressNumber" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>


        <Input.Label name="Bairro" id="district" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>
      </form>
    </>
  )
}

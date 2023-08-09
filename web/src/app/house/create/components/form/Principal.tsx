import styles from './styles.module.scss'
import { Input } from '@/components/input'
export function Principal() {
  return (
    <>
      <h2>Descreva sua acomodação e defina o preço de compra ou de venda</h2>
      <form className={`${styles.form} ${styles.principal}`}>
        <Input.Label name="Titulo" id="title" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Valor para alugar" id="rent" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Valor para comprar" id="buy" isError={false}>
          <Input.Field />
          <Input.Error message="" />
        </Input.Label>

        <Input.Label name="Descrição" id="description" isError={false}>
          <Input.Area />
        </Input.Label>
      </form>
    </>
  )
}

'use client'
import { Input } from '@/components/input'

import styles from './styles.module.scss'

import { usePrincipal } from './usePrincipal'

export function Principal() {
  const { onHandleSubmit, errors, handleSubmit, register } = usePrincipal()

  return (
    <>
      <h2>
        Descreva sua acomodação e defina o preço de compra ou valor de venda
      </h2>
      <form
        id="house-1"
        onSubmit={handleSubmit(onHandleSubmit)}
        className={`${styles.form} ${styles.principal}`}
      >
        <Input.Label name="Titulo" id="title" isError={!!errors.title}>
          <Input.Field
            id="title"
            placeholder="Digite um titulo para seu imovel"
            {...register('title')}
          />
          <Input.Error message={errors.title?.message} />
        </Input.Label>

        <Input.Label
          name="Valor para alugar"
          id="rent"
          isError={!!errors.buyPrice}
        >
          <Input.Field
            type="number"
            id="rent"
            placeholder="$"
            {...register('buyPrice')}
          />
          <Input.Error message={errors.buyPrice?.message} />
        </Input.Label>

        <Input.Label
          name="Valor para comprar"
          id="buy"
          isError={!!errors.rentPrice}
        >
          <Input.Field
            type="number"
            id="buy"
            placeholder="$"
            {...register('rentPrice')}
          />
          <Input.Error message={errors.rentPrice?.message} />
        </Input.Label>

        <Input.Label
          name="Descrição"
          id="description"
          isError={!!errors.description}
        >
          <Input.Area
            id="description"
            placeholder="Descrição"
            {...register('description')}
          />
          <Input.Error message={errors.description?.message} />
        </Input.Label>
      </form>
    </>
  )
}

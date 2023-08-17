import styles from './styles.module.scss'
import { Input } from '@/components/input'
import { useLocation } from './useLocation'
export function Location() {
  const { errors, handleSubmit, onHandleSubmit, register } = useLocation()

  return (
    <>
      <h2>Agora confirme as informações referente a residência</h2>
      <form
        id="house-1"
        onSubmit={handleSubmit(onHandleSubmit)}
        className={`${styles.form} ${styles.location}`}
      >
        <Input.Label name="Estado" id="state" isError={!!errors.state}>
          <Input.Field id="state" {...register('state')} />
          <Input.Error message={errors.state?.message} />
        </Input.Label>

        <Input.Label name="Cidade" id="city" isError={!!errors.city}>
          <Input.Field id="city" {...register('city')} />
          <Input.Error message={errors.city?.message} />
        </Input.Label>

        <Input.Label name="Endereço" id="address" isError={!!errors.address}>
          <Input.Field id="address" {...register('address')} />
          <Input.Error message={errors.address?.message} />
        </Input.Label>

        <Input.Label
          name="Numero"
          id="addressNumber"
          isError={!!errors.addressNumber}
        >
          <Input.Field
            id="addressNumber"
            {...register('addressNumber')}
            type="number"
          />
          <Input.Error message={errors.addressNumber?.message} />
        </Input.Label>

        <Input.Label name="Bairro" id="district" isError={!!errors.district}>
          <Input.Field id="district" {...register('district')} />
          <Input.Error message={errors.district?.message} />
        </Input.Label>
      </form>
    </>
  )
}

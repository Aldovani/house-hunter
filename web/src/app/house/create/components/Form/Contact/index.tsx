import styles from './styles.module.scss'
import { Input } from '@/components/Input'
import { useContact } from './useContact'
export function Contact() {
  const { errors, handleSubmit, onHandleSubmit, register } = useContact()

  return (
    <>
      <h2>Agora adicione uma forma de entrar em contato com você </h2>
      <form
        id="house-1"
        onSubmit={handleSubmit(onHandleSubmit)}
        className={`${styles.form} ${styles.contacts}`}
      >
        <Input.Label name="Celular" id="cellphone" isError={!!errors.cellphone}>
          <Input.Field
            placeholder="(16) 9 9999 - 9999"
            id="cellphone"
            {...register('cellphone')}
          />
          <Input.Error message={errors.cellphone?.message} />
        </Input.Label>

        <Input.Label name="Telefone Fixo" id="phone" isError={!!errors.phone}>
          <Input.Field
            placeholder="(16) 9 9999 - 9999"
            id="phone"
            {...register('phone')}
          />
          <Input.Error message={errors.phone?.message} />{' '}
        </Input.Label>

        <Input.Label name="Facebook" id="facebook" isError={!!errors.facebook}>
          <Input.Field
            placeholder="www.facebook.com/"
            id="facebbok"
            {...register('facebook')}
          />
          <Input.Error message={errors.facebook?.message} />{' '}
        </Input.Label>

        <Input.Label name="Email" id="email" isError={!!errors.email}>
          <Input.Field
            placeholder="exemplo@gmail.com"
            id="email"
            {...register('email')}
          />
          <Input.Error message={errors.email?.message} />{' '}
        </Input.Label>
      </form>
    </>
  )
}

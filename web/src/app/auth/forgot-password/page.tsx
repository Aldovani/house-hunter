'use client'

import styles from '../page.module.scss'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useForgotPassword } from './useForgotPassword'

export default function ForgotPassword() {
  const { register, errors, handleForgotPassword, handleSubmit } =
    useForgotPassword()
  return (
    <>
      <h2 className={styles.title}>Recupere sua senha</h2>
      <p className={styles.description}>
        insira seu e-mail para podemos te ajudar a recuperar sua senha
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className={styles.form}
      >
        <Input.Label id="email" name="Email" isError={!!errors.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.Error message={errors.email?.message} />
        </Input.Label>
        <Button>Recuperar senha</Button>
      </form>
    </>
  )
}

'use client'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import styles from '../../page.module.scss'

import { useResetPassword } from './useResetPassword'

export default function ResetPassword() {
  const {
    confirmPasswordIcon,
    passwordIcon,
    toggleConfirmPasswordIcon,
    togglePasswordIcon,
    errors,
    handleSubmit,
    register,
    handleResetPassword,
  } = useResetPassword()

  return (
    <>
      <h2 className={styles.title}>Recupere sua senha</h2>
      <p className={styles.description}>Digite sua nova senha</p>

      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className={styles.form}
      >
        <Input.Label id="password" name="Senha" isError={false}>
          <Input.Field
            type={!passwordIcon ? 'password' : 'text'}
            id="password"
            placeholder="••••••••••••••••"
            {...register('password')}
          >
            <Input.Icon
              handleClick={togglePasswordIcon}
              icon={!passwordIcon ? FiEye : FiEyeOff}
            />
          </Input.Field>
          <Input.Error message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          name="Confirmar senha"
          isError={false}
        >
          <Input.Field
            type={!confirmPasswordIcon ? 'password' : 'text'}
            id="confirmPassword"
            placeholder="••••••••••••••••"
            {...register('confirmPassword')}
          >
            <Input.Icon
              handleClick={toggleConfirmPasswordIcon}
              icon={!confirmPasswordIcon ? FiEye : FiEyeOff}
            />
          </Input.Field>

          <Input.Error message={errors.confirmPassword?.message} />
        </Input.Label>
        <Button type="submit">Atualizar senha</Button>
      </form>
    </>
  )
}

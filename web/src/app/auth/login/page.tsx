'use client'

import Link from 'next/link'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import styles from './styles.module.scss'
import authStyles from '../page.module.scss'

import { useLogin } from './useLogin'

export default function Login() {
  const {
    errors,
    handleSign,
    handleSubmit,
    register,
    handleToggleIconInput,
    inputPasswordIcon,
  } = useLogin()

  return (
    <>
      <h2 className={`${styles.title} ${authStyles.title}`}>
        Bem vindo ao House-Hunter
      </h2>
      <p className={authStyles.description}>
        Seja bem vindo de volta ! por favor, insira seus dados
      </p>

      <form onSubmit={handleSubmit(handleSign)} className={authStyles.form}>
        <Input.Label id="email" name="Email" isError={!!errors.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.Error message={errors.email?.message} />
        </Input.Label>

        <Input.Label id="password" name="Senha" isError={!!errors.password}>
          <Input.ContainerIcons>
            <Input.Field
              id="password"
              type={!inputPasswordIcon ? 'password' : 'text'}
              placeholder="••••••••••••••••"
              {...register('password')}
            />
            <Input.Icon
              handleClick={handleToggleIconInput}
              icon={!inputPasswordIcon ? FiEye : FiEyeOff}
            />
          </Input.ContainerIcons>
          <Input.Error message={errors.password?.message} />
        </Input.Label>

        <Button>Entrar</Button>
      </form>

      <Link href="/auth/register" className={styles.register}>
        Cadastrar-se
      </Link>
      <p className={authStyles.link}>
        Esqueceu a senha ?{' '}
        <Link href="/auth/forgot-password"> redefina sua senha</Link>
      </p>
    </>
  )
}

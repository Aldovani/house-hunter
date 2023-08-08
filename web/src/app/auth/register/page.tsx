'use client'
import Link from 'next/link'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import styles from './styles.module.scss'
import authStyles from '../page.module.scss'

import { useRegister } from './useRegister'

export default function RegisterUser() {
  const {
    errors,
    handleRegister,
    handleSubmit,
    handleToggleIconInput,
    inputPasswordIcon,
    register,
  } = useRegister()

  return (
    <>
      <h2 className={`${styles.title} ${authStyles.title}`}>
        Cadastre-se na nossa plataforma
      </h2>
      <p className={authStyles.description}>
        cadastre-se na plataforma, para adquirir ou anunciar seu imóvel
      </p>

      <form onSubmit={handleSubmit(handleRegister)} className={authStyles.form}>
        <Input.Label id="nome" name="Nome" isError={!!errors?.name}>
          <Input.Field
            id="nome"
            type="text"
            placeholder="Digite seu email"
            {...register('name')}
          />
          <Input.Error message={errors.name?.message} />
        </Input.Label>

        <Input.Label id="email" name="Email" isError={!!errors?.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.Error message={errors.email?.message} />
        </Input.Label>

        <Input.Label id="password" name="Senha" isError={!!errors?.password}>
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
            <Input.Icon
              handleClick={handleToggleIconInput}
              icon={!inputPasswordIcon ? FiEye : FiEyeOff}
            />
          </Input.ContainerIcons>
          <Input.Error message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          name="confirmar senha"
          isError={!!errors?.confirmPassword}
        >
          <Input.ContainerIcons>
            <Input.Field
              id="confirmPassword"
              type={!inputPasswordIcon ? 'password' : 'text'}
              placeholder="••••••••••••••••"
              {...register('confirmPassword')}
            />
            <Input.Icon
              handleClick={handleToggleIconInput}
              icon={!inputPasswordIcon ? FiEye : FiEyeOff}
            />
          </Input.ContainerIcons>
          <Input.Error message={errors.confirmPassword?.message} />
        </Input.Label>

        <Button>Registar-se</Button>
      </form>

      <p className={`${authStyles.link} ${styles.link}`}>
        Já possui uma conta? <Link href="/auth/login">fazer login</Link>
      </p>
    </>
  )
}

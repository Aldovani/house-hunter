'use client'

import { Button } from '@/components/ui/Button'

import { useLogin } from './useLogin'
import { Link } from '@/components/ui/Link'
import { Input } from '@/components/ui/input'

export default function Login() {
  const { errors, handleSign, handleSubmit, register } = useLogin()

  return (
    <>
      <h2 className="text-2xl text-slate-900 max-w-44 leading-[130%]">
        Bem vindo ao House-Hunter
      </h2>
      <p className="text-sm text-slate-400">
        Seja bem vindo de volta ! por favor, insira seus dados
      </p>

      <form onSubmit={handleSubmit(handleSign)} className="mt-8">
        <Input.Label id="email" name="Email" isError={!!errors.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.MessageError message={errors.email?.message} />
        </Input.Label>

        <Input.Label
          id="password"
          name="Senha"
          className="mt-4"
          isError={!!errors.password}
        >
          <Input.Field
            id="password"
            type="password"
            placeholder="••••••••••••••••"
            {...register('password')}
          ></Input.Field>
          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <Button className="mt-5">Entrar</Button>

        <Link className="mt-3" href="/register" variant="secondary">
          Cadastrar-se
        </Link>
        <p className="text-center text-slate-400 mt-5">
          Esqueceu a senha ?{' '}
          <Link variant="link" className="inline" href="/forgot-password">
            {' '}
            redefina sua senha
          </Link>
        </p>
      </form>
    </>
  )
}

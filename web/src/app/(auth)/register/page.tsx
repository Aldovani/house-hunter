'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'

import { useRegister } from './useRegister'
import { Link } from '@/components/ui/Link'

export default function RegisterUser() {
  const { errors, handleRegister, handleSubmit, register } = useRegister()

  return (
    <>
      <h2 className="text-2xl text-slate-900 max-w-60 leading-[130%]">
        Cadastre-se na nossa plataforma
      </h2>
      <p className="text-sm mt-2 text-slate-400">
        cadastre-se na plataforma, para adquirir ou anunciar seu imóvel
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-2 mt-8 "
      >
        <Input.Label id="nome" name="Nome" isError={!!errors?.name}>
          <Input.Field
            id="nome"
            type="text"
            placeholder="Digite seu email"
            {...register('name')}
          />
          <Input.MessageError message={errors.name?.message} />
        </Input.Label>

        <Input.Label id="email" name="Email" isError={!!errors?.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.MessageError message={errors.email?.message} />
        </Input.Label>

        <Input.Label id="password" name="Senha" isError={!!errors?.password}>
          <Input.Field
            id="password"
            type={'password'}
            placeholder="••••••••••••••••"
            {...register('password')}
          ></Input.Field>

          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          name="confirmar senha"
          isError={!!errors?.confirmPassword}
        >
          <Input.Field
            id="confirmPassword"
            type="password"
            placeholder="••••••••••••••••"
            {...register('confirmPassword')}
          ></Input.Field>

          <Input.MessageError message={errors.confirmPassword?.message} />
        </Input.Label>

        <Button className="mt-2">Registar-se</Button>

        <p className="text-slate-400 mt-2 text-center">
          Já possui uma conta?{' '}
          <Link className="inline w-fit " variant="link" href="/sign-in">
            fazer login
          </Link>
        </p>
      </form>
    </>
  )
}

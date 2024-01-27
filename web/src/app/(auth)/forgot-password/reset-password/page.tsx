'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'

import { useResetPassword } from './useResetPassword'

export default function ResetPassword() {
  const { errors, handleSubmit, register, handleResetPassword } =
    useResetPassword()

  return (
    <>
      <h2 className="text-2xl text-slate-900 leading-[130%]">
        Recupere sua senha
      </h2>
      <p className="text-sm mt-2 text-slate-400">Digite sua nova senha</p>

      <form onSubmit={handleSubmit(handleResetPassword)} className="mt-8">
        <Input.Label id="password" name="Senha" isError={false}>
          <Input.Field
            type="password"
            id="password"
            placeholder="••••••••••••••••"
            {...register('password')}
          ></Input.Field>
          <Input.MessageError message={errors.password?.message} />
        </Input.Label>

        <Input.Label
          id="confirmPassword"
          name="Confirmar senha"
          isError={false}
          className="mt-4"
        >
          <Input.Field
            type="password"
            id="confirmPassword"
            placeholder="••••••••••••••••"
            {...register('confirmPassword')}
          ></Input.Field>

          <Input.MessageError message={errors.confirmPassword?.message} />
        </Input.Label>
        <Button className="mt-5" type="submit">
          Atualizar senha
        </Button>
      </form>
    </>
  )
}

'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from './useForgotPassword'

export default function ForgotPassword() {
  const { register, errors, handleForgotPassword, handleSubmit } =
    useForgotPassword()
  return (
    <>
      <h2 className="text-2xl text-slate-900 leading-[130%]">
        Recupere sua senha
      </h2>
      <p className="text-sm mt-2 text-slate-400">
        insira seu e-mail para podemos te ajudar a recuperar sua senha
      </p>

      <form onSubmit={handleSubmit(handleForgotPassword)} className="mt-8">
        <Input.Label id="email" name="Email" isError={!!errors.email}>
          <Input.Field
            id="email"
            type="text"
            placeholder="Digite seu email"
            {...register('email')}
          />
          <Input.MessageError message={errors.email?.message} />
        </Input.Label>
        <Button className="mt-5">Recuperar senha</Button>
      </form>
    </>
  )
}

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useResetPassword() {
  const resetPassword = z
    .object({
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword'],
        })
      }
    })

  type ResetPassword = z.infer<typeof resetPassword>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPassword),
    mode: 'onSubmit',
  })

  function handleResetPassword() {
    console.log('')
  }
  return {
    handleSubmit,
    handleResetPassword,

    register,
    errors,
  }
}

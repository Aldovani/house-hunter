import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export function useForgotPassword() {
  const forgotPasswordSchema = z.object({
    email: z.string().email(),
  })

  type ForgotPassword = z.infer<typeof forgotPasswordSchema>

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ForgotPassword>({
    mode: 'onSubmit',
    resolver: zodResolver(forgotPasswordSchema),
  })

  function handleForgotPassword() {
    console.log('')
  }

  return {
    register,
    handleSubmit,
    errors,

    handleForgotPassword,
  }
}

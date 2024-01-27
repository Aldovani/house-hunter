import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

export function useRegister() {
  const registerSchema = z
    .object({
      name: z.string().min(6, 'Nome deve conter pelo menos 6 caracteres'),
      email: z.string().email('Endereço de e-mail inválido.'),
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

  type Register = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  })

  function handleRegister() {
    // Fazer chamada a api
  }

  return {
    handleRegister,
    register,
    handleSubmit,
    errors,
  }
}

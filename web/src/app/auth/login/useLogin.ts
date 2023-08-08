import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export function useLogin() {
  const loginSchema = z.object({
    email: z.string().email('Endereço de e-mail inválido.'),
    password: z.string().min(6),
  })

  type Login = z.infer<typeof loginSchema>

  const [inputPasswordIcon, setInputPasswordIcon] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  function handleSign() {
    // Fazer chamada a api
  }

  function handleToggleIconInput() {
    setInputPasswordIcon((prev) => !prev)
  }

  return {
    handleSign,
    register,
    handleSubmit,
    errors,
    handleToggleIconInput,
    inputPasswordIcon,
  }
}

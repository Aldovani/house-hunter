import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function usePrincipal() {
  const { house, handleNextFormStep, updateHouseData } = useCreateHouse()

  const principalDataHouseSchema = z
    .object({
      title: z
        .string()
        .min(20, { message: 'O titulo deve conter pelo menos 20 caracteres' }),
      buyPrice: z.coerce.number().min(0).optional(),
      rentPrice: z.coerce.number().min(0).optional(),
      description: z.string().min(1, { message: 'test' }),
    })
    .superRefine(({ buyPrice, rentPrice }, ctx) => {
      if (!buyPrice && !rentPrice) {
        ctx.addIssue({
          code: 'custom',
          message: 'Valor de compra ou alugar deve ser preenchido',
          path: ['rentPrice'],
        })
        ctx.addIssue({
          code: 'custom',
          message: 'Valor de compra ou alugar deve ser preenchido',
          path: ['buyPrice'],
        })
      }
    })

  type principalData = z.infer<typeof principalDataHouseSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<principalData>({
    resolver: zodResolver(principalDataHouseSchema),
    mode: 'onSubmit',
    defaultValues: {
      buyPrice: house?.buyPrice,
      description: house?.description,
      rentPrice: house?.rentPrice,
      title: house?.title,
    },
  })

  const onHandleSubmit: SubmitHandler<principalData> = (data) => {
    updateHouseData({
      buyPrice: data.buyPrice,
      rentPrice: data.rentPrice,
      title: data.title,
      description: data.description,
    })
    handleNextFormStep()
  }

  return {
    onHandleSubmit,
    house,
    register,
    handleSubmit,
    errors,
  }
}

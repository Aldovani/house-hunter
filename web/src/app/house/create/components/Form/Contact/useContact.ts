import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function useContact() {
  const { handleNextFormStep, updateContact, contacts } = useCreateHouse()

  const contactDataHouseSchema = z.object({
    cellphone: z.string().min(1),
    facebook: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
  })

  type contactData = z.infer<typeof contactDataHouseSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactData>({
    resolver: zodResolver(contactDataHouseSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...contacts,
    },
  })

  const onHandleSubmit: SubmitHandler<contactData> = ({
    cellphone,
    email,
    facebook,
    phone,
  }) => {
    updateContact({
      cellphone,
      email,
      facebook,
      phone,
    })
    handleNextFormStep()
  }
  return {
    onHandleSubmit,
    handleSubmit,
    errors,
    register,
    contacts,
  }
}

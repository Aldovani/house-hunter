import { z } from 'zod'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useLocation() {
  const { house, handleNextFormStep, updateHouseData } = useCreateHouse()

  const locationDataHouseSchema = z.object({
    state: z.string().min(1),
    district: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
    addressNumber: z.coerce.number().min(1),
  })

  type locationData = z.infer<typeof locationDataHouseSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<locationData>({
    resolver: zodResolver(locationDataHouseSchema),
    mode: 'onSubmit',
    defaultValues: {
      address: house?.location?.address,
      addressNumber: house?.location?.addressNumber,
      city: house?.location?.city,
      district: house?.location?.district,
      state: house?.location?.state,
    },
  })

  const onHandleSubmit: SubmitHandler<locationData> = ({
    address,
    addressNumber,
    city,
    district,
    state,
  }) => {
    updateHouseData({
      location: {
        ...house?.location,
        address,
        addressNumber,
        city,
        district,
        state,
      },
    })
    handleNextFormStep()
  }

  return {
    onHandleSubmit,
    register,
    handleSubmit,
    errors,
    house,
  }
}

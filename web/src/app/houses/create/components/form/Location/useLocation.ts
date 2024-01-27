import { z } from 'zod'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function useLocation() {
  const { handleNextStep, immobile, updateImmobile } = useCreateHouse()

  const locationDataHouseSchema = z.object({
    state: z.string().min(1),
    district: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
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
      address: immobile?.location?.address,
      city: immobile?.location?.city,
      district: immobile?.location?.district,
      state: immobile?.location?.state,
    },
  })

  const handleSubmitLocation: SubmitHandler<locationData> = ({
    address,
    city,
    district,
    state,
  }) => {
    handleNextStep()

    updateImmobile({
      location: {
        ...immobile?.location,
        address,
        city,
        district,
        state,
      },
    })
  }

  return {
    handleSubmitLocation,
    register,
    handleSubmit,
    errors,
    immobile,
  }
}

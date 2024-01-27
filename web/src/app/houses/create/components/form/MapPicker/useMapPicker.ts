import { FormEvent, useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { Location } from '@/components/map'

export function useMapPicker() {
  const { updateImmobile, handleNextStep, immobile } = useCreateHouse()
  const [position, setPosition] = useState<Location[] | undefined>(() => {
    const latitude = immobile?.location?.latitude
    const longitude = immobile?.location?.longitude

    if (!latitude || !longitude) {
      return undefined
    }

    return [{ lat: latitude, lng: longitude }]
  })

  function handleClickPosition(lat: number, lng: number) {
    setPosition([
      {
        lat,
        lng,
      },
    ])
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!position) return

    updateImmobile({
      location: {
        ...immobile?.location,
        latitude: position[0].lat,
        longitude: position[0].lng,
      },
    })

    handleNextStep()
  }

  return { handleSubmit, position, handleClickPosition }
}

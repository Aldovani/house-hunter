import { FormEvent, useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { Location } from '@/components/map'

export function useMapPicker() {
  const { updateHouseData, handleNextFormStep, house } = useCreateHouse()
  const [position, setPosition] = useState<Location[] | undefined>(() => {
    if (!house?.location?.latitude && !house?.location?.longitude) {
      return undefined
    }

    const { latitude, longitude } = house.location

    return [{ lat: latitude!, lng: longitude! }]
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

    updateHouseData({
      location: {
        latitude: position[0].lat,
        longitude: position[0].lng,
      },
    })

    handleNextFormStep()
  }

  return { handleSubmit, position, handleClickPosition }
}

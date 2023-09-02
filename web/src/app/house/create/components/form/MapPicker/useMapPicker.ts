import { FormEvent, useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { Location } from '@/components/Map'

export function useMapPicker() {
  const { updateHouseData, handleNextFormStep, house } = useCreateHouse()
  const [position, setPosition] = useState<Location[] | undefined>(() => {
    const latitude = house?.location?.latitude
    const longitude = house?.location?.longitude

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

    updateHouseData({
      location: {
        ...house?.location,
        latitude: position[0].lat,
        longitude: position[0].lng,
      },
    })

    handleNextFormStep()
  }

  return { handleSubmit, position, handleClickPosition }
}

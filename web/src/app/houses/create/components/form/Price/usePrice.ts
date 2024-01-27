import { FormSubmit, InputChange } from '@/@types/events'
import { useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function usePrice() {
  const { handleNextStep, immobile, updateImmobile } = useCreateHouse()

  const [available, setAvailable] = useState<string>(
    immobile?.available || 'rent',
  )
  const [price, setPrice] = useState(immobile?.price || 0)

  function handleChangeAvailable(event: InputChange) {
    setAvailable(event.target.value)
  }

  function handleChangeInput(event: InputChange) {
    setPrice(Number(event.target.value))
  }

  function handleSubmit(event: FormSubmit) {
    event.preventDefault()

    if (price <= 0) {
      alert('valor invalido')
      return
    }
    updateImmobile({
      available,
      price,
    })

    handleNextStep()
  }
  return {
    handleChangeAvailable,
    handleChangeInput,
    price,
    handleSubmit,
    available,
  }
}

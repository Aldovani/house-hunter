import { FormSubmit, InputChange } from '@/@types/events'
import { useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function usePropertyType() {
  const { handleNextStep, immobile, updateImmobile } = useCreateHouse()
  const [propertyType, setPropertyType] = useState<null | string>(
    immobile?.type || null,
  )

  function handleChangeProperty(event: InputChange) {
    setPropertyType(event.target.value)
  }

  function handleSubmit(event: FormSubmit) {
    event.preventDefault()

    if (!propertyType) {
      alert('Selecione uma tipo de propriedade')
      return
    }

    updateImmobile({ type: propertyType })
    handleNextStep()
  }
  return {
    propertyType,
    handleSubmit,
    handleChangeProperty,
  }
}

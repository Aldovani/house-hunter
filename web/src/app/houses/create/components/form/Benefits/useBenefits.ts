import { FormSubmit, InputChange } from '@/@types/events'
import { useState } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function useBenefits() {
  const { handleNextStep, updateImmobile, immobile } = useCreateHouse()
  const [benefits, setBenefits] = useState(immobile?.benefits || [''])

  function handleChange(event: InputChange) {
    if (!event.target.checked) {
      setBenefits((prev) => prev.filter((e) => e !== event.target.value))
      return
    }
    setBenefits((prev) => [...prev, event.target.value])
  }

  function handleSubmit(event: FormSubmit) {
    event.preventDefault()
    updateImmobile({ benefits })

    handleNextStep()
  }

  return {
    benefits,
    handleSubmit,
    handleChange,
  }
}

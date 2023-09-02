import { FormEvent } from 'react'
import { useCreateHouse } from '../../../context/CreateHouseProvider'

export function useRooms() {
  const { handleNextFormStep, rooms } = useCreateHouse()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (rooms?.length === 0 || !rooms) {
      return
    }
    handleNextFormStep()
  }
  const myRooms = [
    { id: '1', name: 'Sala' },
    { id: '2', name: 'Quarto' },
    { id: '3', name: 'Cozinha' },
    { id: '4', name: 'Banheiro' },
  ]

  return { handleSubmit, myRooms }
}

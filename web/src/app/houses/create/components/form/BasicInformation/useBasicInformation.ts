import { FormSubmit } from '@/@types/events'
import { useCreateHouse } from '../../../context/CreateHouseProvider'
import { useReducer } from 'react'

type Information = 'bathroom' | 'bedroom' | 'room' | 'car'
type InformationState = {
  bathroom: number
  bedroom: number
  room: number
  car: number
}

type Action =
  | { type: 'increment'; information: Information }
  | { type: 'decrement'; information: Information }

function reducer(state: InformationState, action: Action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        [action.information]: (state[action.information] += 1),
      }
    case 'decrement':
      return {
        ...state,
        [action.information]: (state[action.information] -= 1),
      }
    default:
      return state
  }
}

export function useBasicInformation() {
  const { handleNextStep, updateImmobile, immobile } = useCreateHouse()

  const [information, dispatch] = useReducer(reducer, {
    bathroom: immobile?.basicInformation?.bathroom || 0,
    bedroom: immobile?.basicInformation?.bedroom || 0,
    room: immobile?.basicInformation?.room || 0,
    car: immobile?.basicInformation?.car || 0,
  })

  function handleSubmit(event: FormSubmit) {
    event.preventDefault()

    updateImmobile({
      basicInformation: information,
    })

    handleNextStep()
  }

  return {
    information,
    dispatch,
    handleSubmit,
  }
}

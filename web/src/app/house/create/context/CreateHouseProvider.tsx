'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface Room {
  name: string
  id: string
}

interface Contacts {
  Facebook: string
  phone: string
  cellPhone: string
  email: string
}

interface House {
  title?: string
  description?: string
  buyPrice?: number
  rentPrice?: number
  location?: {
    latitude: number
    longitude: number
    state: string
    city: string
    address: string
    addressNumber: number
    district: string
  }
  contact?: Contacts
}

interface CreateHouseContextValues {
  house: House | null
  rooms: Room[] | null
  updateHouseData(data: Partial<House>): void
  handlePrevFormStep(): void
  handleNextFormStep(): void
  formStep: number
  progressBar: number
}

interface CreateHouseProviderProps {
  children: ReactNode
}

const CreateHouseContext = createContext({} as CreateHouseContextValues)

export function CreateHouseProvider({ children }: CreateHouseProviderProps) {
  const [house, setHouse] = useState<House | null>(null)
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [formStep, setFormStep] = useState(0)
  const [progressBar, setProgressBar] = useState(0)

  function handleNextFormStep() {
    if (formStep === 5) return
    setFormStep((prevState) => {
      const newState = prevState + 1
      setProgressBar(newState * 20)
      return newState
    })
  }

  function handlePrevFormStep() {
    if (formStep === 0) return
    setFormStep((prevState) => {
      const newState = prevState - 1
      setProgressBar(newState * 20)
      return newState
    })
  }

  function updateHouseData(data: Partial<House>) {
    setHouse((prevState) => {
      return {
        ...prevState,
        ...data,
      }
    })
  }

  return (
    <CreateHouseContext.Provider
      value={{
        house,
        rooms,
        updateHouseData,
        handlePrevFormStep,
        handleNextFormStep,
        formStep,
        progressBar,
      }}
    >
      {children}
    </CreateHouseContext.Provider>
  )
}

export function useCreateHouse() {
  const {
    house,
    rooms,
    updateHouseData,
    formStep,
    handleNextFormStep,
    handlePrevFormStep,
    progressBar,
  } = useContext(CreateHouseContext)

  return {
    house,
    rooms,

    updateHouseData,
    formStep,
    handleNextFormStep,
    handlePrevFormStep,
    progressBar,
  }
}

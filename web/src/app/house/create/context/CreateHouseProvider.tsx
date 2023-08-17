'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface Contacts {
  cellphone: string
  facebook?: string
  phone?: string
  email?: string
}

interface House {
  title?: string
  description?: string
  buyPrice?: number
  rentPrice?: number
  location?: {
    latitude?: number
    longitude?: number
    state?: string
    city?: string
    address?: string
    addressNumber?: number
    district?: string
  }
}

interface CreateHouseContextValues {
  house: House | null
  rooms: string[] | null
  contacts: Contacts | null
  updateHouseData(data: Partial<House>): void
  updateContact(data: Contacts): void
  updateRooms(id: string): void
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
  const [contacts, setContacts] = useState<Contacts | null>(null)
  const [rooms, setRooms] = useState<string[] | null>(null)
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
  function updateContact(data: Contacts) {
    setContacts((prevState) => {
      return {
        ...prevState,
        ...data,
      }
    })
  }

  function updateRooms(id: string) {
    setRooms((prev) => {
      if (!prev) {
        return [id]
      }

      if (!prev.find((roomId) => roomId === id)) {
        return [...prev, id]
      }

      const newRooms = prev.filter((roomId) => roomId !== id)

      return newRooms
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
        updateContact,
        contacts,
        updateRooms,
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
    contacts,
    updateContact,
    updateRooms,
  } = useContext(CreateHouseContext)

  return {
    house,
    rooms,
    updateHouseData,
    formStep,
    handleNextFormStep,
    handlePrevFormStep,
    progressBar,
    updateRooms,
    contacts,
    updateContact,
  }
}

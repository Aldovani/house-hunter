'use client'
import { useSearchParams, useRouter } from 'next/navigation'

import { ReactNode, createContext, useContext, useState } from 'react'

type Location = {
  latitude: number
  longitude: number
  state: string
  city: string
  address: string
  district: string
}
type BasicInformation = {
  bedroom: number
  bathroom: number
  car: number
  room: number
}

interface Immobile {
  id: string
  title: string
  description: string
  price: number
  available: string
  type: string
  location: Partial<Location>
  basicInformation: Partial<BasicInformation>
  benefits: string[]
}

interface CreateHouseContextValues {
  immobile: Partial<Immobile> | null
  updateImmobile(data: Partial<Immobile>): void
  handlePrevStep(): void
  handleNextStep(): void
  progressBar: number
  step: number
}

interface CreateHouseProviderProps {
  children: ReactNode
}

const CreateHouseContext = createContext({} as CreateHouseContextValues)

export function CreateHouseProvider({ children }: CreateHouseProviderProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const step = Number(searchParams.get('step')) || 0
  const [immobile, setImmobile] = useState<Partial<Immobile> | null>(null)
  const [progressBar, setProgressBar] = useState(step * 11 || 0)

  function handleNextStep() {
    if (step === 7) return
    router.push(`?step=${step + 1}`)
    setProgressBar((step + 1) * 11)
  }

  function handlePrevStep() {
    if (step === 0) return
    router.push(`?step=${step - 1}`)
    setProgressBar((step - 1) * 11)
  }

  function handleSubmitImmobile() {
    console.log('')
  }

  function updateImmobile(data: Partial<Immobile>) {
    setImmobile((prevState) => {
      return {
        ...prevState,
        ...data,
      }
    })
  }

  return (
    <CreateHouseContext.Provider
      value={{
        immobile,
        updateImmobile,
        handlePrevStep,
        handleNextStep,
        progressBar,

        step,
      }}
    >
      {children}
    </CreateHouseContext.Provider>
  )
}

export function useCreateHouse() {
  const data = useContext(CreateHouseContext)

  return data
}

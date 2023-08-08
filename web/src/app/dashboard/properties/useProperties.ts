'use client'
import { useState } from 'react'

type HouseStates = 'all' | 'available' | 'unavailable'

export function useProperties() {
  const [houseStates, setHouseStates] = useState<HouseStates>('all')

  function handleHouseState(state: HouseStates) {
    setHouseStates(state)
  }

  return { houseStates, handleHouseState }
}

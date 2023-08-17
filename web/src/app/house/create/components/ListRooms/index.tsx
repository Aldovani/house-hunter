'use client'

import styles from './styles.module.scss'
import { useCreateHouse } from '../../context/CreateHouseProvider'

interface Room {
  id: string
  name: string
}

interface ListRoomsProps {
  rooms: Room[]
}

export function ListRooms({ rooms }: ListRoomsProps) {
  const { updateRooms, rooms: roomsHouse } = useCreateHouse()

  function handleChange(id: string) {
    updateRooms(id)
  }

  return (
    <>
      {rooms.map((room) => (
        <div key={room.id}>
          <input
            type="checkbox"
            name="rooms"
            onChange={() => handleChange(room.id)}
            id={room.id}
            defaultChecked={!!roomsHouse?.find((id) => id === room.id)}
          />
          <label htmlFor={room.id} className={styles.labelRoom}>
            <span>{room.name}</span>
          </label>
        </div>
      ))}
    </>
  )
}

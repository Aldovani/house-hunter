import { Prisma, Room } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IRoomsRepository } from '../IRoomsRepository'

export class RoomsRepositoryInMemory implements IRoomsRepository {
  private rooms: Room[] = []

  async updateNameById(name: string, roomId: string): Promise<Room> {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId)

    this.rooms[roomIndex].name = name

    return this.rooms[roomIndex]
  }

  async getAllRooms(): Promise<Room[]> {
    return this.rooms
  }

  async findByName(name: string): Promise<Room | null> {
    const room = this.rooms.find((room) => room.name === name)
    if (!room) {
      return null
    }
    return room
  }

  async findById(id: string): Promise<Room | null> {
    const room = this.rooms.find((room) => room.id === id)
    if (!room) {
      return null
    }
    return room
  }

  async deleRoomById(id: string): Promise<void> {
    const rooms = this.rooms.filter((room) => room.id !== id)

    this.rooms = rooms
  }

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    const room = {
      id: randomUUID(),
      name: data.name,
    }

    this.rooms.push(room)

    return room
  }
}

import { Room, Prisma } from '@prisma/client'
import { IRoomsRepository } from '../IRoomsRepository'
import { prisma } from '../../libs/prisma'

export class PrismaRoomsRepository implements IRoomsRepository {
  async findByName(name: string): Promise<Room | null> {
    return await prisma.room.findUnique({
      where: {
        name,
      },
    })
  }

  async findById(id: string): Promise<Room | null> {
    return await prisma.room.findUnique({
      where: {
        id,
      },
    })
  }

  async deleRoomById(id: string): Promise<void> {
    await prisma.room.delete({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    const room = await prisma.room.create({
      data,
    })

    return room
  }

  async getAllRooms(): Promise<Room[]> {
    const rooms = await prisma.room.findMany()
    return rooms
  }

  async updateNameById(name: string, roomId: string): Promise<Room> {
    const room = await prisma.room.update({
      data: {
        name,
      },
      where: {
        id: roomId,
      },
    })

    return room
  }
}

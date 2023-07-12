import { Prisma, Room } from '@prisma/client'

export interface IRoomsRepository {
  findByName(name: string): Promise<Room | null>
  findById(id: string): Promise<Room | null>
  deleRoomById(id: string): Promise<void>
  create(data: Prisma.RoomCreateInput): Promise<Room>
  getAllRooms(): Promise<Room[]>
  updateNameById(name: string, roomId: string): Promise<Room>
}

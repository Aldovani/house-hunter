import { HouseRoom } from '@prisma/client'

export interface IHouseRoomsRepository {
  updateOrCreate(data: HouseRoom): Promise<HouseRoom>
  removeByHouseIdAndRoomId(houseId: string, roomId: string): Promise<void>
  findManyByHouseId(houseId: string): Promise<HouseRoom[]>
}

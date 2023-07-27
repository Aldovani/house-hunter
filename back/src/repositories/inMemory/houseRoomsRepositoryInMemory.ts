import { HouseRoom } from '@prisma/client'
import { IHouseRoomsRepository } from '../IHouseRoomsRepository'

export class HouseRoomsRepositoryInMemory implements IHouseRoomsRepository {
  private houseRooms: HouseRoom[] = []

  async updateOrCreate(data: HouseRoom): Promise<HouseRoom> {
    const houseRoomIndex = this.houseRooms.findIndex(
      (item) =>
        item.house_id === data.house_id && item.room_id === data.room_id,
    )

    if (houseRoomIndex >= 0) {
      const houseRoomFromArray = this.houseRooms[houseRoomIndex]

      const houseRoom: HouseRoom = {
        house_id: data.house_id ?? houseRoomFromArray.house_id,
        quantity: data.quantity,
        room_id: data.room_id ?? houseRoomFromArray.room_id,
      }

      this.houseRooms[houseRoomIndex] = houseRoom

      return houseRoom
    }
    const houseRoom = {
      house_id: data.house_id,
      quantity: data.quantity,
      room_id: data.room_id,
    }

    this.houseRooms.push(houseRoom)

    return houseRoom
  }

  async removeByHouseIdAndRoomId(
    houseId: string,
    roomId: string,
  ): Promise<void> {
    const houseRooms = this.houseRooms.filter(
      (room) => room.room_id !== roomId && room.house_id === houseId,
    )

    this.houseRooms = houseRooms
  }

  async findManyByHouseId(houseId: string): Promise<HouseRoom[]> {
    const rooms = this.houseRooms.filter((room) => room.house_id === houseId)

    return rooms
  }
}

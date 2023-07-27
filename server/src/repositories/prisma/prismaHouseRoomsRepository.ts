import { HouseRoom } from '@prisma/client'
import { IHouseRoomsRepository } from '../IHouseRoomsRepository'
import { prisma } from '../../libs/prisma'

export class PrismaHouseRoomsRepository implements IHouseRoomsRepository {
  async updateOrCreate(data: HouseRoom): Promise<HouseRoom> {
    const house = await prisma.houseRoom.upsert({
      create: {
        quantity: data.quantity,
        house_id: data.house_id,
        room_id: data.room_id,
      },
      update: {
        quantity: data.quantity,
      },
      where: {
        house_id_room_id: {
          house_id: data.house_id,
          room_id: data.room_id,
        },
      },
    })

    return house
  }

  async removeByHouseIdAndRoomId(
    houseId: string,
    roomId: string,
  ): Promise<void> {
    await prisma.houseRoom.delete({
      where: {
        house_id_room_id: {
          house_id: houseId,
          room_id: roomId,
        },
      },
    })
  }

  async findManyByHouseId(houseId: string): Promise<HouseRoom[]> {
    const rooms = await prisma.houseRoom.findMany({
      where: {
        house_id: houseId,
      },
    })

    return rooms
  }
}

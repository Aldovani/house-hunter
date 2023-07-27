import { Prisma, House } from '@prisma/client'
import { IHousesRepository } from '../IHousesRepository'
import { prisma } from '../../libs/prisma'

export class PrismaHousesRepository implements IHousesRepository {
  async updateAvailable(houseId: string, status: boolean): Promise<void> {
    await prisma.house.update({
      data: {
        available: status,
      },
      where: {
        id: houseId,
      },
    })
  }

  async findManyNearby(
    latitude: number,
    longitude: number,
    distance: number,
  ): Promise<House[]> {
    const houses = await prisma.$queryRaw<House[]>`
  SELECT * from houses
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${distance} and available = TRUE
  `

    return houses
  }

  async create(data: Prisma.HouseUncheckedCreateInput): Promise<House> {
    const house = await prisma.house.create({
      data,
    })

    return house
  }

  async findById(id: string, query?: string[]): Promise<House | null> {
    const house = await prisma.house.findUnique({
      where: {
        id,
      },
      include: {
        contact: query ? query.includes('contact') : false,
        house_room: query ? query.includes('room') : false,
        HouseImage: query ? query.includes('image') : false,
      },
    })

    return house
  }

  async findManyByUserId(userId: string): Promise<House[]> {
    const houses = await prisma.house.findMany({
      where: {
        owner_id: userId,
      },
    })

    return houses
  }

  async save(id: string, data: Prisma.HouseUpdateInput): Promise<House> {
    const houseUpdated = await prisma.house.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    })

    return houseUpdated
  }

  async deleteById(id: string): Promise<void> {
    await prisma.house.delete({
      where: {
        id,
      },
    })
  }
}

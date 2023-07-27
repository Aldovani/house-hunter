import { House, Prisma } from '@prisma/client'

export interface IHousesRepository {
  create(data: Prisma.HouseUncheckedCreateInput): Promise<House>
  findById(id: string, query?: string[]): Promise<House | null>
  save(id: string, data: Prisma.HouseUpdateInput): Promise<House>
  deleteById(id: string): Promise<void>
  findManyNearby(
    latitude: number,
    longitude: number,
    distance: number,
  ): Promise<House[]>

  findManyByUserId(userId: string): Promise<House[]>
  updateAvailable(houseId: string, status: boolean): Promise<void>
}

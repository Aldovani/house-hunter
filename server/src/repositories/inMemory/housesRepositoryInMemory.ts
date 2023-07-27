import { Prisma, House } from '@prisma/client'
import { IHousesRepository } from '../IHousesRepository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime'
import { getDistanceBetweenCoordinates } from '../../utils/getDistanceBetweenCoordinates'

export class HousesRepositoryInMemory implements IHousesRepository {
  private houses: House[] = []

  async findManyNearby(
    latitude: number,
    longitude: number,
    distance: number,
  ): Promise<House[]> {
    const houses = this.houses

    const nearByHouses = houses
      .filter((house) => {
        return house.latitude && house.longitude
      })
      .filter((house) => {
        const houseDistance = getDistanceBetweenCoordinates(
          { latitude, longitude },
          {
            latitude: Number(house.latitude),
            longitude: Number(house.longitude),
          },
        )

        return houseDistance < distance
      })

    return nearByHouses
  }

  async findById(id: string): Promise<House | null> {
    const house = this.houses.find((house) => house.id === id)

    if (!house) {
      return null
    }

    return house
  }

  async save(id: string, data: Partial<House>): Promise<House> {
    const house = this.houses.find((house) => house.id === id) as House

    const houseUpdated = Object.assign(house, data)

    return houseUpdated
  }

  async create(data: Prisma.HouseUncheckedCreateInput): Promise<House> {
    const house = {
      id: data.id || randomUUID(),
      title: data.title,
      description: data.description,
      buy_price: new Decimal(data.buy_price.toString()),
      rent_price: new Decimal(data.rent_price.toString()),
      district: data.district,
      created_at: new Date(),
      owner_id: data.owner_id,

      address: data.address,
      address_number: data.address_number,
      city: data.city,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      state: data.state,
      available: false,
    }

    this.houses.push(house)

    return house
  }

  async deleteById(id: string): Promise<void> {
    const houses = this.houses.filter((house) => house.id !== id)
    this.houses = houses
  }

  async findManyByUserId(userId: string): Promise<House[]> {
    const houses = this.houses.filter((house) => house.owner_id === userId)
    return houses
  }

  async updateAvailable(houseId: string, status: boolean): Promise<void> {
    this.houses.forEach((house) => {
      if (house.id === houseId) {
        house.available = status
      }
    })
  }
}

import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { House } from '@prisma/client'

interface FindNearByHousesUseCaseRequest {
  latitude: number
  longitude: number
  distance: number
}
interface FindNearByHousesUseCaseResponse {
  houses: House[]
}

@injectable()
export class FindNearbyHousesUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({
    latitude,
    longitude,
    distance,
  }: FindNearByHousesUseCaseRequest): Promise<FindNearByHousesUseCaseResponse> {
    const houses = await this.housesRepository.findManyNearby(
      latitude,
      longitude,
      distance,
    )

    return {
      houses,
    }
  }
}

import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { House } from '@prisma/client'

interface FindAllHouseUseCaseRequest {
  userId: string
}
interface FindAllHouseUseCaseResponse {
  houses: House[]
}

@injectable()
export class FindAllByUserHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) { }

  async execute({
    userId,
  }: FindAllHouseUseCaseRequest): Promise<FindAllHouseUseCaseResponse> {
    const houses = await this.housesRepository.findManyByUserId(userId)

    return {
      houses,
    }
  }
}

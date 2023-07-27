import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { House } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface GetHouseUseCaseRequest {
  houseId: string
  query?: string[]
}
interface GetHouseUseCaseResponse {
  house: House
}

@injectable()
export class GetHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({
    houseId,
    query,
  }: GetHouseUseCaseRequest): Promise<GetHouseUseCaseResponse> {
    const house = await this.housesRepository.findById(houseId, query)

    if (!house) {
      throw new ResourceNotFoundError()
    }

    return {
      house,
    }
  }
}

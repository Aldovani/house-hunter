import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { House } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'

interface UpdateHouseDataUseCase {
  title?: string
  description?: string
  address?: string
  addressNumber?: number
  district?: string
  city?: string
  state?: string
  buyPrice?: number
  rentPrice?: number
  latitude?: number
  longitude?: number
}

interface UpdateHouseUseCaseRequest {
  houseData: UpdateHouseDataUseCase
  houseId: string
  userId: string
}
interface UpdateHouseUseCaseResponse {
  house: House
}

@injectable()
export class UpdateHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({
    houseData,
    houseId,
    userId,
  }: UpdateHouseUseCaseRequest): Promise<UpdateHouseUseCaseResponse> {
    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwnerIdEqualUserId = userId === houseExists.owner_id

    if (!isOwnerIdEqualUserId) {
      throw new PermissionError()
    }

    const house = await this.housesRepository.save(houseId, houseData)

    return {
      house,
    }
  }
}

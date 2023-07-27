import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'

interface DeleteHouseUseCaseRequest {
  houseId: string
  userId: string
}

@injectable()
export class DeleteHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({ houseId, userId }: DeleteHouseUseCaseRequest) {
    const house = await this.housesRepository.findById(houseId)

    if (!house) {
      throw new ResourceNotFoundError()
    }
    const isOwnerIdEqualUserId = userId === house.owner_id

    if (!isOwnerIdEqualUserId) {
      throw new PermissionError()
    }

    await this.housesRepository.deleteById(houseId)
  }
}

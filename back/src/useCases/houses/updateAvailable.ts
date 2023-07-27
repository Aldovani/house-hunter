import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { IHouseRoomsRepository } from '../../repositories/IHouseRoomsRepository'
import { PermissionError } from '../../shared/errors/PermissionError'
import { IHouseImagesRepository } from '../../repositories/IHouseImagesRepository'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { HouseAvailableError } from '../../shared/errors/HouseAvailableError'

interface UpdateAvailableHouseUseCaseRequest {
  houseId: string
  userId: string
  status: boolean
}
interface UpdateAvailableHouseUseCaseResponse {
  status: boolean
}

@injectable()
export class UpdateAvailableHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
    @inject('HouseRoomsRepository')
    private houseRoomsRepository: IHouseRoomsRepository,
    @inject('HouseImagesRepository')
    private houseImagesRepository: IHouseImagesRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute({
    houseId,
    userId,
    status,
  }: UpdateAvailableHouseUseCaseRequest): Promise<UpdateAvailableHouseUseCaseResponse> {
    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwner = userId === houseExists.owner_id

    if (!isOwner) {
      throw new PermissionError()
    }

    if (!status) {
      await this.housesRepository.updateAvailable(houseId, status)
      return {
        status,
      }
    }

    const houseErrors: string[] = []

    const houseRooms = await this.houseRoomsRepository.findManyByHouseId(
      houseId,
    )
    if (houseRooms.length === 0) {
      houseErrors.push('rooms is required')
    }

    const houseContacts = await this.contactsRepository.findManyByHouseId(
      houseId,
    )

    if (houseContacts.length === 0) {
      houseErrors.push('contacts is required')
    }

    const houseImages = await this.houseImagesRepository.findManyByHouseId(
      houseId,
    )

    if (!houseImages || houseImages.length < 5) {
      houseErrors.push('images is required, min 5 images')
    }

    if (houseErrors.length > 0) {
      throw new HouseAvailableError(houseErrors)
    }

    await this.housesRepository.updateAvailable(houseId, status)

    return {
      status,
    }
  }
}

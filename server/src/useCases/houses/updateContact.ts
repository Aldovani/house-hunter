import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { Contact } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { PermissionError } from '../../shared/errors/PermissionError'

export interface ContactRequest {
  phone?: string
  facebook?: string
  email?: string
  cellphone: string
}

interface UpdateContactHouseUseCaseRequest {
  contacts: ContactRequest
  houseId: string
  userId: string
}
interface UpdateContactHouseUseCaseResponse {
  contact: Contact
}

@injectable()
export class UpdateContactHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute({
    contacts,
    houseId,
    userId,
  }: UpdateContactHouseUseCaseRequest): Promise<UpdateContactHouseUseCaseResponse> {
    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwnerIdEqualUserId = userId === houseExists.owner_id

    if (!isOwnerIdEqualUserId) {
      throw new PermissionError()
    }

    const contact = await this.contactsRepository.createOrUpdate({
      ...contacts,
      houseId,
    })

    return {
      contact,
    }
  }
}

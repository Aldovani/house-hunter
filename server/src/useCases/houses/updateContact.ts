import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { Contact } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { IContactsRepository } from '../../repositories/IContactsRepository'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { PermissionError } from '../../shared/errors/PermissionError'

export interface ContactRequest {
  value: string
  categoryId: string
}

interface UpdateContactHouseUseCaseRequest {
  contacts: ContactRequest[]
  houseId: string
  userId: string
}
interface UpdateContactHouseUseCaseResponse {
  contact: Contact[]
}

@injectable()
export class UpdateContactHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
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

    const categories = await this.categoriesRepository.findAll()

    const onlyIdOfCategories = categories.map((category) => category.id)

    const filteredContactsList = contacts.filter(
      (contact) => onlyIdOfCategories.includes(contact.categoryId) && contact,
    )

    const newContacts: Contact[] = []

    for await (const item of filteredContactsList) {
      if (!item.value) {
        await this.contactsRepository.removeByHouseIdAndCategoryId(
          houseId,
          item.categoryId,
        )
      } else if (item.value) {
        const updatedContact = await this.contactsRepository.createOrUpdate({
          category_id: item.categoryId,
          value: item.value,
          house_id: houseId,
        })
        newContacts.push(updatedContact)
      }
    }

    return {
      contact: newContacts,
    }
  }
}

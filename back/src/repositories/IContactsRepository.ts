import { Contact } from '@prisma/client'

export interface CreateOrUpdateContactDTO {
  category_id: string
  house_id: string
  value: string
}

export interface IContactsRepository {
  createOrUpdate(data: CreateOrUpdateContactDTO): Promise<Contact>
  removeByHouseIdAndCategoryId(
    houseId: string,
    categoryId: string,
  ): Promise<void>
  findManyByHouseId(houseId: string): Promise<Contact[]>
}

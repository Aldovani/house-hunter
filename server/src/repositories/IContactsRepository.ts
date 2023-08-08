import { Contact } from '@prisma/client'

export interface ContactDTO {
  houseId: string
  cellphone: string
  phone?: string
  email?: string
  facebook?: string
}

export interface IContactsRepository {
  createOrUpdate(data: ContactDTO): Promise<Contact>
  findByHouseId(houseId: string): Promise<Contact | null>
}

import { Contact } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  CreateOrUpdateContactDTO,
  IContactsRepository,
} from '../IContactsRepository'

export class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = []

  async createOrUpdate({
    category_id,
    house_id,
    value,
  }: CreateOrUpdateContactDTO): Promise<Contact> {
    const contactIndex = this.contacts.findIndex(
      (contact) =>
        contact.house_id === house_id && contact.category_id === category_id,
    )

    if (contactIndex < 0) {
      const contact = {
        house_id,
        id: randomUUID(),
        category_id,
        value,
      }

      this.contacts.push(contact)

      return contact
    }

    const contact: Contact = {
      category_id,
      house_id,
      value,
    }

    this.contacts[contactIndex] = contact

    return contact
  }

  async removeByHouseIdAndCategoryId(
    houseId: string,
    categoryId: string,
  ): Promise<void> {
    const contacts = this.contacts.filter(
      (contact) =>
        contact.house_id !== houseId && contact.category_id !== categoryId,
    )

    this.contacts = contacts
  }

  async findManyByHouseId(houseId: string): Promise<Contact[]> {
    const contacts = this.contacts.filter(
      (contact) => contact.house_id === houseId,
    )

    return contacts
  }
}

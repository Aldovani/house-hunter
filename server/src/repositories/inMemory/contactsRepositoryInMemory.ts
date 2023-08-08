import { Contact } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ContactDTO, IContactsRepository } from '../IContactsRepository'

export class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = []

  async createOrUpdate({
    houseId,
    cellphone,
    email,
    facebook,
    phone,
  }: ContactDTO): Promise<Contact> {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.house_id === houseId,
    )

    if (contactIndex < 0) {
      const contact = {
        id: randomUUID(),
        house_id: houseId,
        cellphone,
        email: email || null,
        facebook: facebook || null,
        phone: phone || null,
      }

      this.contacts.push(contact)

      return contact
    }

    const contact: Contact = {
      id: randomUUID(),
      house_id: houseId,
      cellphone,
      email: email || null,
      facebook: facebook || null,
      phone: phone || null,
    }

    this.contacts[contactIndex] = contact

    return contact
  }

  async findByHouseId(houseId: string): Promise<Contact | null> {
    const contact = this.contacts.find(
      (contact) => contact.house_id === houseId,
    )
    if (!contact) {
      return null
    }

    return contact
  }
}

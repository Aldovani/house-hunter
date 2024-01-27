import { Contact } from '@prisma/client'
import { ContactDTO, IContactsRepository } from '../IContactsRepository'
import { prisma } from '../../libs/prisma'

export class PrismaContactsRepository implements IContactsRepository {
  async createOrUpdate({
    cellphone,
    houseId,
    email,
    facebook,
    phone,
  }: ContactDTO): Promise<Contact> {
    prisma.user.aggregate({})
    const contact = await prisma.contact.upsert({
      create: {
        email,
        facebook,
        phone,
        house_id: houseId,
        cellphone,
      },
      update: {
        email,
        facebook,
        phone,
        cellphone,
      },
      where: {
        house_id: houseId,
      },
    })

    return contact
  }

  async findByHouseId(houseId: string): Promise<Contact | null> {
    const contact = await prisma.contact.findFirst({
      where: {
        house_id: houseId,
      },
    })

    return contact
  }
}

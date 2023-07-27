import { Contact } from '@prisma/client'
import {
  CreateOrUpdateContactDTO,
  IContactsRepository,
} from '../IContactsRepository'
import { prisma } from '../../libs/prisma'

export class PrismaContactsRepository implements IContactsRepository {
  async createOrUpdate({
    category_id,
    house_id,
    value,
  }: CreateOrUpdateContactDTO): Promise<Contact> {
    const contact = await prisma.contact.upsert({
      create: {
        value,
        category_id,
        house_id,
      },
      update: {
        value,
      },
      where: {
        house_id_category_id: {
          category_id,
          house_id,
        },
      },
    })

    return contact
  }

  async removeByHouseIdAndCategoryId(
    houseId: string,
    categoryId: string,
  ): Promise<void> {
    await prisma.contact.delete({
      where: {
        house_id_category_id: {
          category_id: categoryId,
          house_id: houseId,
        },
      },
    })
  }

  async findManyByHouseId(houseId: string): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany({
      where: {
        house_id: houseId,
      },
    })

    return contacts
  }
}

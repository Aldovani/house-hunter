import { HouseImage } from '@prisma/client'
import { IHouseImagesRepository } from '../IHouseImagesRepository'
import { prisma } from '../../libs/prisma'

export class prismaHouseImagesRepository implements IHouseImagesRepository {
  async save(houseId: string, fileName: string): Promise<HouseImage> {
    const image = await prisma.houseImage.create({
      data: {
        name: fileName,
        house_id: houseId,
      },
    })
    return image
  }

  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByHouseId(id: string): Promise<HouseImage[]> {
    const images = await prisma.houseImage.findMany({
      where: {
        house_id: id,
      },
    })

    return images
  }
}

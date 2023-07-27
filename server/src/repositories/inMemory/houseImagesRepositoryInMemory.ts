import { HouseImage } from '@prisma/client'
import { IHouseImagesRepository } from '../IHouseImagesRepository'
import { randomUUID } from 'crypto'

export class HouseImagesRepositoryInMemory implements IHouseImagesRepository {
  private houseImages: HouseImage[] = []

  async save(houseId: string, fileName: string): Promise<HouseImage> {
    const image = {
      house_id: houseId,
      name: fileName,
      id: randomUUID(),
    }
    this.houseImages.push({
      house_id: houseId,
      name: fileName,
      id: randomUUID(),
    })

    return image
  }

  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByHouseId(houseId: string): Promise<HouseImage[]> {
    const images = this.houseImages.filter(
      (image) => image.house_id === houseId,
    )

    return images
  }
}

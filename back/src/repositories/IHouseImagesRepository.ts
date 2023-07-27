import { HouseImage } from '@prisma/client'

export interface IHouseImagesRepository {
  save(houseId: string, fileName: string): Promise<HouseImage>
  deleteById(id: string): Promise<void>
  findManyByHouseId(houseId: string): Promise<HouseImage[]>
}

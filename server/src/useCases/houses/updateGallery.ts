import { inject, injectable } from 'tsyringe'
import { IStorageProvider } from '../../shared/provider/storage/IStorageProvider'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { IHouseImagesRepository } from '../../repositories/IHouseImagesRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../shared/errors/PermissionError'
import { HouseImage } from '@prisma/client'
import { ResourceLimitsError } from '../../shared/errors/ResourceLimitsError'

interface UpdateGalleryUseCaseRequest {
  houseId: string
  userId: string
  files: string[]
}
interface UpdateGalleryUseCaseResponse {
  houseImages: HouseImage[]
}

@injectable()
export class UpdateGalleryUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
    @inject('HouseImagesRepository')
    private houseImagesRepository: IHouseImagesRepository,
  ) {}

  async execute({
    files,
    houseId,
    userId,
  }: UpdateGalleryUseCaseRequest): Promise<UpdateGalleryUseCaseResponse> {
    const houseExists = await this.housesRepository.findById(houseId)

    if (!houseExists) {
      throw new ResourceNotFoundError()
    }

    const isOwnerIdEqualUserId = userId === houseExists.owner_id

    if (!isOwnerIdEqualUserId) {
      throw new PermissionError()
    }

    const imagesLength = (
      await this.houseImagesRepository.findManyByHouseId(houseId)
    ).length

    const totalOfImages = imagesLength + files.length

    if (totalOfImages > 10) {
      throw new ResourceLimitsError()
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const fileName = await this.storageProvider.save(file, 'houses')

        const houseImage = await this.houseImagesRepository.save(
          houseId,
          fileName,
        )

        return { ...houseImage }
      }),
    )

    return {
      houseImages: images,
    }
  }
}

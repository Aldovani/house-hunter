import { inject, injectable } from 'tsyringe'
import { IHousesRepository } from '../../repositories/IHousesRepository'
import { House } from '@prisma/client'

interface CreateHouseUseCaseDTO {
  title: string
  rentPrice: number
  buyPrice: number
  description: string
  latitude: number
  longitude: number
  city: string
  address: string
  addressNumber: number
  state: string
  district: string
}

interface CreateHouseUseCaseRequest {
  data: CreateHouseUseCaseDTO
  userId: string
}
interface CreateHouseUseCaseResponse {
  house: House
}

@injectable()
export class CreateHouseUseCase {
  constructor(
    @inject('HousesRepository')
    private housesRepository: IHousesRepository,
  ) {}

  async execute({
    data,
    userId,
  }: CreateHouseUseCaseRequest): Promise<CreateHouseUseCaseResponse> {
    const house = await this.housesRepository.create({
      description: data.description,
      title: data.title,
      buy_price: data.buyPrice,
      rent_price: data.rentPrice,
      owner_id: userId,
      address: data.address,
      address_number: data.addressNumber,
      city: data.city,
      district: data.district,
      latitude: data.latitude,
      longitude: data.longitude,
      state: data.state,
    })

    return {
      house,
    }
  }
}

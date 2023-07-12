import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { Room } from '@prisma/client'

interface GetAllRoomUseCaseResponse {
  rooms: Room[]
}

@injectable()
export class GetAllRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute(): Promise<GetAllRoomUseCaseResponse> {
    const rooms = await this.roomsRepository.getAllRooms()

    return {
      rooms,
    }
  }
}

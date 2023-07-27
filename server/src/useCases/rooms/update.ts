import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'
import { Room } from '@prisma/client'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface UpdateRoomUseCaseRequest {
  name: string
  roomId: string
}
interface UpdateRoomUseCaseResponse {
  room: Room
}

@injectable()
export class UpdateRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute({
    name,
    roomId,
  }: UpdateRoomUseCaseRequest): Promise<UpdateRoomUseCaseResponse> {
    const roomExists = await this.roomsRepository.findById(roomId)

    if (!roomExists) {
      throw new ResourceNotFoundError()
    }

    const roomAlreadyExistsWithThisName = await this.roomsRepository.findByName(
      name,
    )

    if (roomAlreadyExistsWithThisName) {
      throw new ResourceAlreadyExistError()
    }

    const room = await this.roomsRepository.updateNameById(name, roomId)

    return {
      room,
    }
  }
}

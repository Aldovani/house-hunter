import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { ResourceNotFoundError } from '../../shared/errors/ResourceNotFoundError'

interface DeleteRoomUseCaseRequest {
  roomId: string
}

@injectable()
export class DeleteRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute({ roomId }: DeleteRoomUseCaseRequest) {
    const roomExisted = await this.roomsRepository.findById(roomId)

    if (!roomExisted) {
      throw new ResourceNotFoundError()
    }

    await this.roomsRepository.deleRoomById(roomId)
  }
}

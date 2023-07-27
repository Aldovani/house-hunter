import { inject, injectable } from 'tsyringe'
import { IRoomsRepository } from '../../repositories/IRoomsRepository'
import { ResourceAlreadyExistError } from '../../shared/errors/ResourceAlreadyExistError'
import { Room } from '@prisma/client'

interface CreateRoomUseCaseRequest {
  name: string
}
interface CreateRoomUseCaseResponse {
  room: Room
}

@injectable()
export class CreateRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository,
  ) {}

  async execute({
    name,
  }: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
    const roomAlreadyExists = await this.roomsRepository.findByName(name)

    if (roomAlreadyExists) {
      throw new ResourceAlreadyExistError()
    }

    const room = await this.roomsRepository.create({ name })

    return {
      room,
    }
  }
}

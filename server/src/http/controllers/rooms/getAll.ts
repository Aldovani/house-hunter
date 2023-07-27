import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { GetAllRoomUseCase } from '../../../useCases/rooms/listAll'

export class GetAllRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const getAllRoomUseCase = container.resolve(GetAllRoomUseCase)

    const { rooms } = await getAllRoomUseCase.execute()

    return rep.status(200).send({ rooms })
  }
}

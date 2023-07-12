import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { DeleteRoomUseCase } from '../../../useCases/rooms/delete'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'

export class DeleteRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateRoomParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = updateRoomParamsSchema.parse(req.params)

    const deleteRoomUseCase = container.resolve(DeleteRoomUseCase)
    try {
      await deleteRoomUseCase.execute({
        roomId: id,
      })

      return rep.status(204).send()
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

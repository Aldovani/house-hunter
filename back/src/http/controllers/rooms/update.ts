import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'
import { UpdateRoomUseCase } from '../../../useCases/rooms/update'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'

export class UpdateRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateRoomParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateRoomBodySchema = z.object({
      name: z.string(),
    })

    const { name } = updateRoomBodySchema.parse(req.body)
    const { id } = updateRoomParamsSchema.parse(req.params)

    const updateRoomUseCase = container.resolve(UpdateRoomUseCase)

    try {
      const { room } = await updateRoomUseCase.execute({
        name,
        roomId: id,
      })

      return rep.status(200).send({ room })
    } catch (err) {
      if (err instanceof ResourceAlreadyExistError) {
        return rep.status(400).send({ error: err.message })
      } else if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

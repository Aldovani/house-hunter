import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateRoomUseCase } from '../../../useCases/rooms/create'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'

export class CreateRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const createRoomBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createRoomBodySchema.parse(req.body)

    const createRoomUseCase = container.resolve(CreateRoomUseCase)

    try {
      const { room } = await createRoomUseCase.execute({
        name,
      })

      return rep.status(201).send({ room })
    } catch (err) {
      if (err instanceof ResourceAlreadyExistError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

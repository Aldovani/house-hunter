import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { UpdateRoomHouseUseCase } from '../../../useCases/houses/updateRoom'

export class UpdateRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateRoomParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateRoomBodySchema = z.object({
      rooms: z
        .object({
          quantity: z.number(),
          roomId: z.string().uuid(),
        })
        .array(),
    })

    const { rooms } = updateRoomBodySchema.parse(req.body)
    const { id } = updateRoomParamsSchema.parse(req.params)

    const updateRoomUseCase = container.resolve(UpdateRoomHouseUseCase)
    const { sub } = req.user

    const roomParsed = rooms.map((room) => {
      return {
        quantity: room.quantity,
        room_id: room.roomId,
      }
    })

    try {
      await updateRoomUseCase.execute({
        houseId: id,
        rooms: roomParsed,
        userId: sub,
      })

      return rep.status(204).send()
    } catch (err) {
      if (err instanceof ResourceAlreadyExistError) {
        return rep.status(400).send({ error: err.message })
      } else if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

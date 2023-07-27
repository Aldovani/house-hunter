import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateRoomHouseUseCase } from '../../../useCases/houses/updateRoom'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../../shared/errors/PermissionError'

export class UpdateRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateHouseRoomParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateHouseRoomBodySchema = z
      .object({
        quantity: z.number(),
        roomId: z.string().uuid(),
      })
      .array()

    const { sub } = req.user

    const rooms = updateHouseRoomBodySchema.parse(req.body)
    const { id } = updateHouseRoomParamsSchema.parse(req.body)

    const roomsConverted = rooms.map((room) => {
      return {
        quantity: room.quantity,
        room_id: room.roomId,
      }
    })

    const updateRoomHouseUseCase = container.resolve(UpdateRoomHouseUseCase)

    try {
      await updateRoomHouseUseCase.execute({
        houseId: id,
        userId: sub,
        rooms: roomsConverted,
      })

      rep.status(204).send()
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof PermissionError) {
        return rep.status(401).send({ error: err.message })
      }
    }
  }
}

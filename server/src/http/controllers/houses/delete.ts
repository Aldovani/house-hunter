import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { DeleteHouseUseCase } from '../../../useCases/houses/delete'

export class DeleteHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const deleteHouseParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { sub } = req.user

    const { id } = deleteHouseParamsSchema.parse(req.params)

    const deleteHouseUseCase = container.resolve(DeleteHouseUseCase)

    await deleteHouseUseCase.execute({
      userId: sub,
      houseId: id,
    })

    rep.status(204).send()
  }
}

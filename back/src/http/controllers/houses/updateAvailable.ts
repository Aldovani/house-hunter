import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../../shared/errors/PermissionError'
import { UpdateAvailableHouseUseCase } from '../../../useCases/houses/updateAvailable'
import { HouseAvailableError } from '../../../shared/errors/HouseAvailableError'

export class UpdateAvailableHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateAvailableHouseParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateAvailableHouseBodySchema = z.object({
      status: z.boolean().default(false),
    })

    const { sub } = req.user

    const { status } = updateAvailableHouseBodySchema.parse(req.body)
    const { id } = updateAvailableHouseParamsSchema.parse(req.params)

    const updateAvailableHouseUseCase = container.resolve(
      UpdateAvailableHouseUseCase,
    )

    try {
      await updateAvailableHouseUseCase.execute({
        houseId: id,
        userId: sub,
        status,
      })

      rep.status(204).send()
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof PermissionError) {
        return rep.status(401).send({ error: err.message })
      } else if (err instanceof HouseAvailableError) {
        return rep
          .status(401)
          .send({ message: err.message, errors: err.errors })
      }
    }
  }
}

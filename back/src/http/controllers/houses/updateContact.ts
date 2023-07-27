import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateContactHouseUseCase } from '../../../useCases/houses/updateContact'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../../shared/errors/PermissionError'

export class UpdateContactController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateHouseLocalizationParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateHouseLocalizationBodySchema = z.object({
      contacts: z
        .object({
          value: z.string(),
          categoryId: z.string().uuid(),
        })
        .array(),
    })

    const { sub } = req.user

    const { contacts } = updateHouseLocalizationBodySchema.parse(req.body)
    const { id } = updateHouseLocalizationParamsSchema.parse(req.params)

    const updateContactsUseCase = container.resolve(UpdateContactHouseUseCase)

    try {
      await updateContactsUseCase.execute({
        houseId: id,
        userId: sub,
        contacts,
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

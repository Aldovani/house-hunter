import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { FindAllByHouseAppointmentUseCase } from '../../../useCases/appointments/findAllByHouse'

export class FindAllByHouseAppointmentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const findAllByHouseAppointmentParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const findAllByHouseAppointmentQuerySchema = z.object({
      date: z.coerce.date().optional(),
    })

    const { id } = findAllByHouseAppointmentParamsSchema.parse(req.params)
    const { date } = findAllByHouseAppointmentQuerySchema.parse(req.query)

    const findAllByHouseAppointmentUseCase = container.resolve(
      FindAllByHouseAppointmentUseCase,
    )

    try {
      const { appointments } = await findAllByHouseAppointmentUseCase.execute({
        houseId: id,
        date,
      })

      rep.status(201).send({ appointments })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

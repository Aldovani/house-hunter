import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { CreateAppointmentUseCase } from '../../../useCases/appointments/create'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../../shared/errors/PermissionError'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'

export class CreateAppointmentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const createAppointmentBodySchema = z.object({
      date: z.coerce.date(),
      houseId: z.string().uuid(),
    })

    const { sub } = req.user
    console.log(req.body)

    const { date, houseId } = createAppointmentBodySchema.parse(req.body)

    const createAppointmentUseCase = container.resolve(CreateAppointmentUseCase)

    try {
      const { appointment } = await createAppointmentUseCase.execute({
        appointmentDate: date,
        houseId,
        userId: sub,
      })

      rep.status(201).send({ appointment })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof PermissionError) {
        return rep.status(401).send({ error: err.message })
      } else if (err instanceof ResourceAlreadyExistError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

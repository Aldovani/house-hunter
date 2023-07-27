import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { PermissionError } from '../../../shared/errors/PermissionError'
import { ChangeStatusAppointmentUseCase } from '../../../useCases/appointments/changeStatus'

export class ChangeStatusAppointmentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const changeStatusAppointmentBodySchema = z.object({
      status: z.enum(['ACCEPTED', 'CANCELED']),
    })
    const createAppointmentParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { sub } = req.user

    const { status } = changeStatusAppointmentBodySchema.parse(req.body)
    const { id } = createAppointmentParamsSchema.parse(req.params)

    const changeStatusAppointmentUseCase = container.resolve(
      ChangeStatusAppointmentUseCase,
    )

    try {
      const { appointment } = await changeStatusAppointmentUseCase.execute({
        status,
        userId: sub,
        appointmentId: id,
      })

      rep.status(200).send({ appointment })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof PermissionError) {
        return rep.status(401).send({ error: err.message })
      }
    }
  }
}

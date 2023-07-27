import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { FindAllByUserAppointmentUseCase } from '../../../useCases/appointments/findAllByUser'

export class FindAllByUserAppointmentController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { sub } = req.user
    const findAllByUserAppointmentUseCase = container.resolve(
      FindAllByUserAppointmentUseCase,
    )

    try {
      const { appointments } = await findAllByUserAppointmentUseCase.execute({
        userId: sub,
      })

      rep.status(201).send({ appointments })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

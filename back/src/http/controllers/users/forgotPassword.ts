import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ForgotPasswordUseCase } from '../../../useCases/users/forgotPassword'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'

export class ForgotPasswordController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const forgotPasswordBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = forgotPasswordBodySchema.parse(req.body)

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)

    try {
      const { code, token } = await forgotPasswordUseCase.execute({
        email,
      })

      return rep.status(201).send({ code, token })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

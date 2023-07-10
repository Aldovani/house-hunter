import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ForgotPasswordUseCase } from '../../../useCases/users/forgotPassword'

export class ForgotPasswordController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const forgotPasswordBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = forgotPasswordBodySchema.parse(req.body)

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase)

    const { code, token } = await forgotPasswordUseCase.execute({
      email,
    })

    rep.status(201).send({ code, token })
  }
}

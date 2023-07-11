import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { VerifyCodeForgotPasswordUseCase } from '../../../useCases/users/verifyCodeForgotPassword'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { ExpiredTokenError } from '../../../shared/errors/ExpiredTokenError'
import { InvalidCodeError } from '../../../shared/errors/InvalidCodeError'

export class VerifyCodeForgotPasswordController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const verifyCodeForgotPasswordBodySchema = z.object({
      token: z.string(),
      code: z.string().min(6),
    })

    const { code, token } = verifyCodeForgotPasswordBodySchema.parse(req.body)

    const verifyCodeForgotPasswordUseCase = container.resolve(
      VerifyCodeForgotPasswordUseCase,
    )

    try {
      const { token: PasswordToken } =
        await verifyCodeForgotPasswordUseCase.execute({
          token,
          code,
        })

      return rep.status(201).send({ PasswordToken })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof ExpiredTokenError) {
        return rep.status(400).send({ error: err.message })
      } else if (err instanceof InvalidCodeError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

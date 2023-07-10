import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { VerifyCodeForgotPasswordUseCase } from '../../../useCases/users/verifyCodeForgotPassword'

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

    const { token: PasswordToken } =
      await verifyCodeForgotPasswordUseCase.execute({
        token,
        code,
      })

    rep.status(201).send({ PasswordToken })
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ChangePasswordUseCase } from '../../../useCases/users/changePassword'

export class ChangePasswordController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const changePasswordParamsSchema = z.object({
      token: z.string().uuid(),
    })

    const changePasswordBodySchema = z
      .object({
        password: z.string().min(6),
        password_confirm: z.string().min(6),
      })
      .superRefine(({ password, password_confirm }, ctx) => {
        if (password !== password_confirm) {
          ctx.addIssue({
            code: 'custom',
            message: 'The password did not match',
          })
        }
      })

    const { token } = changePasswordParamsSchema.parse(req.params)
    const { password } = changePasswordBodySchema.parse(req.body)

    const changePasswordUseCase = container.resolve(ChangePasswordUseCase)

    const { user } = await changePasswordUseCase.execute({ password, token })

    rep.status(201).send({ user })
  }
}

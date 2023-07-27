import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ChangePasswordUseCase } from '../../../useCases/users/changePassword'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { ExpiredTokenError } from '../../../shared/errors/ExpiredTokenError'

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

    try {
      const changePasswordUseCase = container.resolve(ChangePasswordUseCase)

      const { user } = await changePasswordUseCase.execute({ password, token })

      return rep.status(201).send({ user })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof ExpiredTokenError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

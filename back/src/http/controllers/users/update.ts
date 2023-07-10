import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateUserUseCase } from '../../../useCases/users/update'

export class UpdateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateUserBodySchema = z
      .object({
        userId: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        password_confirm: z.string().min(6).optional(),
      })
      .superRefine(({ password, password_confirm }, ctx) => {
        if (password !== password_confirm) {
          ctx.addIssue({
            code: 'custom',
            message: 'The password did not match',
          })
        }
      })

    const { email, name, password, userId } = updateUserBodySchema.parse(
      req.body,
    )

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const { user } = await updateUserUseCase.execute({
      userId,

      userUpdate: {
        email,
        name,
        password,
      },
    })

    rep.status(201).send({ user })
  }
}

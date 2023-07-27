import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { UpdateUserUseCase } from '../../../useCases/users/update'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { EmailAlreadyExistsError } from '../../../shared/errors/EmailAlreadyExistsError'

export class UpdateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateUserBodySchema = z
      .object({
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

    const { sub } = req.user
    const { email, name, password } = updateUserBodySchema.parse(req.body)

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    try {
      const { user } = await updateUserUseCase.execute({
        userId: sub,
        userUpdate: {
          email,
          name,
          password,
        },
      })

      return rep.status(201).send({ user })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof EmailAlreadyExistsError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

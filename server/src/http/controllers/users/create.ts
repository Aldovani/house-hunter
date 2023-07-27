import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateUserUseCase } from '../../../useCases/users/create'
import { EmailAlreadyExistsError } from '../../../shared/errors/EmailAlreadyExistsError'

export class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const createUserBodySchema = z
      .object({
        name: z.string(),
        email: z.string().email().toLowerCase(),
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

    const { email, name, password } = createUserBodySchema.parse(req.body)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      const { user } = await createUserUseCase.execute({
        email,
        name,
        password,
      })

      return rep.status(201).send({ user })
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

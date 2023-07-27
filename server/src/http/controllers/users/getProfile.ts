import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { GetUserProfileUseCase } from '../../../useCases/users/getProfile'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'

export class GetUserProfileController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { sub } = req.user

    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase)

    try {
      const { user } = await getUserProfileUseCase.execute({
        userId: sub,
      })

      return rep.status(201).send({ user })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

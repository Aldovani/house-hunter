import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { GetUserProfileUseCase } from '../../../useCases/users/getProfile'

export class GetUserProfileController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const getUserProfileParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUserProfileParamsSchema.parse(req.params)

    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase)

    const { user } = await getUserProfileUseCase.execute({
      userId: id,
    })

    rep.status(201).send({ user })
  }
}

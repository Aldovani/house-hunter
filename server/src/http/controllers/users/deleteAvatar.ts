import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { plainToInstance } from 'class-transformer'
import { User } from '../../../entities/user'
import { DeleteAvatarUseCase } from '../../../useCases/users/deleteAvatar'

export class DeleteAvatarController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { sub } = req.user

    const deleteAvatarUseCase = container.resolve(DeleteAvatarUseCase)
    const { user } = await deleteAvatarUseCase.execute({
      userId: sub,
    })

    const userParse = plainToInstance(User, user)
    return rep.status(201).send({ userParse })
  }
}

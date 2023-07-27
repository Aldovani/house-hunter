import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from '../../../useCases/users/updateAvatar'
import { plainToInstance } from 'class-transformer'
import { User } from '../../../entities/user'

export class UpdateAvatarController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { sub } = req.user

    const upload = req.file

    if (!upload) {
      return rep.status(400).send({ error: 'File is required' })
    }

    if (!upload.filename) {
      return rep.status(400).send({ error: 'File name  is required' })
    }

    const mimeTypeRegex = /^(image)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return rep.status(400).send({ error: 'File type invalid' })
    }
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)
    const { user } = await updateAvatarUseCase.execute({
      file: upload.filename,
      userId: sub,
    })

    const userParse = plainToInstance(User, user)
    return rep.status(201).send({ userParse })
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from '../../../useCases/users/updateAvatar'
// import { container } from 'tsyringe'
// import { UpdateAvatarUseCase } from '../../../useCases/users/updateAvatar'

export class UpdateAvatarController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const upload = await req.file({})

    if (!upload) {
      return rep.status(400).send({ error: 'File is required' })
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return rep.status(400).send()
    }
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)
    const { user } = await updateAvatarUseCase.execute({
      file: upload,
      userId: '46241b0b-0afa-441f-af27-90310460963a',
    })

    return rep.status(201).send({ user })
  }
}

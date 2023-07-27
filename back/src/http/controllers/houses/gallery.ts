import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateGalleryUseCase } from '../../../useCases/houses/updateGallery'
import { container } from 'tsyringe'
import { z } from 'zod'

export class UpdateGalleryController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const uploads = req.files

    if (!Array.isArray(uploads)) {
      return rep.status(400).send({ error: 'File is required' })
    }

    const files: string[] = []
    uploads.forEach((file) => {
      const mimeTypeRegex = /^(image)\/[a-zA-Z]+/
      const isValidFileFormat = mimeTypeRegex.test(file.mimetype || '')

      if (!isValidFileFormat) {
        return rep.status(400).send({
          error: `File ${file.originalname} not math with type expected`,
        })
      }

      files.push(file.filename as string)
    })

    const updateGalleryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const updateGalleryUseCase = container.resolve(UpdateGalleryUseCase)

    const { id } = updateGalleryParamsSchema.parse(req.params)
    const { sub } = req.user

    const { houseImages } = await updateGalleryUseCase.execute({
      userId: sub,
      houseId: id,
      files,
    })

    return rep.status(201).send({ houseImages })
  }
}

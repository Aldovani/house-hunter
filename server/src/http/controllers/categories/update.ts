import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'
import { UpdateCategoryUseCase } from '../../../useCases/categories/update'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'

export class UpdateCategoryController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const updateCategoryParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateCategoryBodySchema = z.object({
      name: z.string(),
    })

    const { id } = updateCategoryParamsSchema.parse(req.params)
    const { name } = updateCategoryBodySchema.parse(req.body)

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase)

    try {
      const { category } = await updateCategoryUseCase.execute({
        categoryId: id,
        name,
      })

      rep.status(200).send(category)
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      } else if (err instanceof ResourceAlreadyExistError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

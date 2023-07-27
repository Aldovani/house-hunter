import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../shared/errors/ResourceNotFoundError'
import { DeleteCategoryUseCase } from '../../../useCases/categories/delete'

export class DeleteCategoryController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const deleteCategoryParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteCategoryParamsSchema.parse(req.params)

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)

    try {
      await deleteCategoryUseCase.execute({
        categoryId: id,
      })

      return rep.status(204).send()
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return rep.status(404).send({ error: err.message })
      }
    }
  }
}

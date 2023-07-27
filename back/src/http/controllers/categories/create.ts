import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateCategoryUseCase } from '../../../useCases/categories/create'
import { ResourceAlreadyExistError } from '../../../shared/errors/ResourceAlreadyExistError'

export class CreateCategoryController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const createCategoryBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createCategoryBodySchema.parse(req.body)

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    try {
      const { category } = await createCategoryUseCase.execute({ name })

      rep.status(201).send({ category })
    } catch (err) {
      if (err instanceof ResourceAlreadyExistError) {
        return rep.status(400).send({ error: err.message })
      }
    }
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { FindAllCategoryUseCase } from '../../../useCases/categories/findAll'

export class FindAllCategoryController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const findAllCategoryUseCase = container.resolve(FindAllCategoryUseCase)

    const { category } = await findAllCategoryUseCase.execute()

    return rep.status(200).send({
      category,
    })
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { GetHouseUseCase } from '../../../useCases/houses/get'

export class GetHouseController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const getHouseParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const getHouseQuerySchema = z.object({
      includes: z
        .enum(['image', 'room', 'contact'])
        .array()
        .or(z.enum(['image', 'room', 'contact']).transform((value) => [value]))
        .optional(),
    })

    const { id } = getHouseParamsSchema.parse(req.params)
    const { includes } = getHouseQuerySchema.parse(req.query)

    const getHouseUseCase = container.resolve(GetHouseUseCase)

    const { house } = await getHouseUseCase.execute({
      houseId: id,
      query: includes,
    })

    rep.status(200).send({ house })
  }
}
